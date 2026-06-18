import { AudioPlayerEngine } from '../types';
export interface UseMediaSessionObserverOptions {
    /** Track title shown on the lock screen / OS media UI. */
    title: string;
    artist?: string;
    album?: string;
    /** Lock-screen artwork, e.g. `[{ src, sizes: "512x512", type: "image/jpeg" }]`. */
    artwork?: MediaImage[];
    /** Advance to the next track. Omit when the host has no queue. */
    onNext?: () => void;
    /** Go back to the previous track. Omit when the host has no queue. */
    onPrevious?: () => void;
    /**
     * Opaque key identifying the logical track. Metadata and action handlers
     * re-register when it changes. Defaults to `title`.
     */
    sourceKey?: string;
    /** Seconds moved by the OS seekforward/seekbackward actions. Default 10. */
    seekStep?: number;
}
/**
 * Media Session API integration (progressive enhancement) as a reusable hook,
 * so any skin — the built-in `AudioPlayer` or a custom headless one — gets
 * lock-screen metadata and OS media controls from the same engine.
 *
 * Does nothing (silently) when the browser has no `navigator.mediaSession`.
 */
export declare function useMediaSessionObserver(engine: AudioPlayerEngine, options: UseMediaSessionObserverOptions): void;
//# sourceMappingURL=useMediaSessionObserver.d.ts.map