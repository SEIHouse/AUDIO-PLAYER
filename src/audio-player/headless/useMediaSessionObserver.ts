import { useEffect, useRef } from "react"
import type { AudioPlayerEngine } from "../types"

export interface UseMediaSessionObserverOptions {
    /** Track title shown on the lock screen / OS media UI. */
    title: string
    artist?: string
    album?: string
    /** Lock-screen artwork, e.g. `[{ src, sizes: "512x512", type: "image/jpeg" }]`. */
    artwork?: MediaImage[]
    /** Advance to the next track. Omit when the host has no queue. */
    onNext?: () => void
    /** Go back to the previous track. Omit when the host has no queue. */
    onPrevious?: () => void
    /**
     * Opaque key identifying the logical track. Metadata and action handlers
     * re-register when it changes. Defaults to `title`.
     */
    sourceKey?: string
    /** Seconds moved by the OS seekforward/seekbackward actions. Default 10. */
    seekStep?: number
}

/**
 * Media Session API integration (progressive enhancement) as a reusable hook,
 * so any skin — the built-in `AudioPlayer` or a custom headless one — gets
 * lock-screen metadata and OS media controls from the same engine.
 *
 * Does nothing (silently) when the browser has no `navigator.mediaSession`.
 */
export function useMediaSessionObserver(
    engine: AudioPlayerEngine,
    options: UseMediaSessionObserverOptions
): void {
    // Handlers read the latest engine/options through this ref so a single
    // registration per track never goes stale.
    const latest = useRef({ engine, options })
    latest.current = { engine, options }

    const registerKey = options.sourceKey ?? options.title

    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator))
            return

        const ms = navigator.mediaSession
        const { options: opts } = latest.current

        // Set metadata.
        ms.metadata = new MediaMetadata({
            title: opts.title,
            artist: opts.artist ?? "",
            album: opts.album ?? "",
            artwork: opts.artwork ?? [],
        })

        // Register action handlers. Older browsers throw when an unknown action
        // type is passed, so each registration is wrapped.
        const actions: MediaSessionAction[] = [
            "play",
            "pause",
            "previoustrack",
            "nexttrack",
            "seekbackward",
            "seekforward",
            "stop",
        ]
        const step = opts.seekStep ?? 10
        const handlers: Record<string, MediaSessionActionHandler> = {
            play: () => latest.current.engine.play(true),
            pause: () => latest.current.engine.pause(),
            previoustrack: () => latest.current.options.onPrevious?.(),
            nexttrack: () => latest.current.options.onNext?.(),
            seekbackward: () => latest.current.engine.seekBy(-step),
            seekforward: () => latest.current.engine.seekBy(step),
            stop: () => latest.current.engine.pause(),
        }
        for (const action of actions) {
            try {
                ms.setActionHandler(action, handlers[action])
            } catch {
                /* unsupported action type */
            }
        }

        // Clean up metadata + handlers on unmount and before re-registering
        // for the next track.
        return () => {
            ms.metadata = null
            for (const action of actions) {
                try {
                    ms.setActionHandler(action, null)
                } catch {
                    /* unsupported action type */
                }
            }
        }
        // Re-register only when the logical track changes; everything else is
        // read through `latest`.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerKey])

    // Keep playback state in sync with the OS.
    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator))
            return
        navigator.mediaSession.playbackState = engine.isPlaying
            ? "playing"
            : "paused"
    }, [engine.isPlaying])
}
