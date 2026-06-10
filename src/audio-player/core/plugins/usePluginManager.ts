import { useEffect, useRef } from "react"
import type { AudioPlayerPlugin, PluginPlayerContext } from "./PluginInterface"
import { PluginManager } from "./PluginManager"

/** React bridge that keeps a PluginManager stable while plugin arrays change. */
export function usePluginManager(
    plugins: readonly AudioPlayerPlugin[],
    context: PluginPlayerContext
): PluginManager {
    const managerRef = useRef<PluginManager | null>(null)
    if (managerRef.current === null) {
        managerRef.current = new PluginManager(context)
    } else {
        managerRef.current.setContext(context)
    }

    const manager = managerRef.current

    useEffect(() => {
        manager.replace(plugins)
    }, [manager, plugins])

    useEffect(() => () => manager.clear(), [manager])

    return manager
}
