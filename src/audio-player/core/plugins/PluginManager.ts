import type {
    AudioPlayerPlugin,
    PluginHookArgs,
    PluginHookName,
    PluginPlayerContext,
} from "./PluginInterface"

type HookCallable<K extends PluginHookName> = (
    this: AudioPlayerPlugin,
    ...args: PluginHookArgs[K]
) => unknown

type RegisteredPlugin = {
    plugin: AudioPlayerPlugin
    cleanup?: () => void
}

/** Register plugins and safely dispatch player lifecycle hooks. */
export class PluginManager {
    private readonly plugins = new Map<string, RegisteredPlugin>()
    private context: PluginPlayerContext

    constructor(context: PluginPlayerContext) {
        this.context = context
    }

    setContext(context: PluginPlayerContext) {
        this.context = context
    }

    register(plugin: AudioPlayerPlugin) {
        if (!plugin?.name) {
            this.reportError("register", new Error("Plugin is missing a name"))
            return
        }

        const existing = this.plugins.get(plugin.name)
        if (existing?.plugin === plugin) return
        if (existing) this.unregister(plugin.name)

        let cleanup: (() => void) | undefined
        try {
            const result = plugin.init(this.context)
            if (typeof result === "function") cleanup = result
            this.plugins.set(plugin.name, { plugin, cleanup })
        } catch (error) {
            this.reportError(`init:${plugin.name}`, error)
            try {
                plugin.destroy()
            } catch (destroyError) {
                this.reportError(`destroy:${plugin.name}`, destroyError)
            }
        }
    }

    unregister(name: string) {
        const registered = this.plugins.get(name)
        if (!registered) return
        this.plugins.delete(name)
        try {
            registered.cleanup?.()
        } catch (error) {
            this.reportError(`cleanup:${name}`, error)
        }
        try {
            registered.plugin.destroy()
        } catch (error) {
            this.reportError(`destroy:${name}`, error)
        }
    }

    replace(nextPlugins: readonly AudioPlayerPlugin[]) {
        const nextNames = new Set(nextPlugins.map((plugin) => plugin.name))
        for (const name of this.plugins.keys()) {
            if (!nextNames.has(name)) this.unregister(name)
        }
        for (const plugin of nextPlugins) this.register(plugin)
    }

    clear() {
        for (const name of [...this.plugins.keys()]) this.unregister(name)
    }

    has(name: string) {
        return this.plugins.has(name)
    }

    list() {
        return [...this.plugins.values()].map(({ plugin }) => plugin)
    }

    trigger<K extends PluginHookName>(
        hook: K,
        ...args: PluginHookArgs[K]
    ): unknown[] {
        const results: unknown[] = []
        for (const { plugin } of this.plugins.values()) {
            const hookFn = plugin[hook]
            if (typeof hookFn !== "function") continue
            try {
                results.push((hookFn as HookCallable<K>).call(plugin, ...args))
            } catch (error) {
                this.reportError(`${hook}:${plugin.name}`, error)
            }
        }
        return results
    }

    triggerUntilHandled<K extends PluginHookName>(
        hook: K,
        ...args: PluginHookArgs[K]
    ): boolean {
        for (const { plugin } of this.plugins.values()) {
            const hookFn = plugin[hook]
            if (typeof hookFn !== "function") continue
            try {
                if ((hookFn as HookCallable<K>).call(plugin, ...args) === true) return true
            } catch (error) {
                this.reportError(`${hook}:${plugin.name}`, error)
            }
        }
        return false
    }

    private reportError(scope: string, error: unknown) {
        if (typeof console === "undefined") return
        // eslint-disable-next-line no-console
        console.warn(`[AudioPlayer PluginManager] ${scope} failed:`, error)
    }
}
