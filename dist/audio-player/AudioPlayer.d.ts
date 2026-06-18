import { AudioPlayerProps } from './types';
/**
 * The standalone, self-contained player (`PLAYER_FACE_CAPABILITIES.portable`).
 *
 * Full-featured portable player with complete surface infrastructure support:
 * - `SEICanvasHost` for plugin visual areas (canvas toggle + Up Next queue)
 * - `ScrubberCanvasHost` + `WaveformAdapter` for unified scrubber waveform
 * - `PlayerSurfaceButtons` providing:
 *   - Left: SEI Canvas toggle button
 *   - Right: `SEICanvasActionMenu` (radial command wheel)
 * - `SAPController` for deep actions (shuffle, repeat, automix, autoplay,
 *   queue, info, share, plugins) — shared with the arc menu via workspace routes
 *
 * The arc menu and "..." button share a single SAPController instance, with
 * workspace routes determining which focused panel displays (e.g. Lyrics,
 * Automix, Plugin Settings). This matches the FullCardPlayer architecture.
 *
 * Waveform display is controlled by:
 * 1. Explicit `showWaveform` prop (highest priority)
 * 2. WaveformPlugin presence + toggle state
 * 3. Falls back to basic progress bar
 *
 * Mobile volume follows `defaultShowVolume()` default (visible on desktop,
 * hidden on touch).
 */
export declare function AudioPlayer(props: AudioPlayerProps): import("react").JSX.Element;
export default AudioPlayer;
//# sourceMappingURL=AudioPlayer.d.ts.map