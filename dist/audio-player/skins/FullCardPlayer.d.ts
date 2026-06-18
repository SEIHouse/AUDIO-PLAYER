import { CSSProperties } from 'react';
import { AudioPlayerTheme } from '../types';
export interface FullCardPlayerProps extends AudioPlayerTheme {
    /**
     * Show the volume slider. Defaults to `true` on desktop and `false` on
     * mobile/touch devices (e.g. iOS Safari), where programmatic volume is
     * ignored and the mute button is the reliable control. Pass an explicit
     * boolean to override the per-device default.
     */
    showVolume?: boolean;
    className?: string;
    style?: CSSProperties;
}
/**
 * The rich "now playing" card, driven by the global session. Keeps the core
 * transport visible (prev / back 10 / play / fwd 10 / next); shuffle, repeat,
 * automix, queue, info, and share live in the SAP Controller behind the "…"
 * button. This skin is the designated owner of the autoplay-blocked prompt so
 * users don't see five simultaneous prompts.
 *
 * Capability-driven (`PLAYER_FACE_CAPABILITIES.fullCard`): the fully-wired face.
 * It hosts the SEICanvas (`supportsSEICanvas`), the ScrubberCanvas
 * (`supportsScrubberCanvas`), and the contextual radial menu
 * (`supportsContextualActions`, rendered via `PlayerSurfaceButtons`) — none of
 * these are hard-coded here; each render zone follows the model. The SAP
 * three-dot controller is always present for deep actions independent of those
 * capabilities.
 */
export declare function FullCardPlayer({ showVolume, className, style, ...theme }: FullCardPlayerProps): import("react").JSX.Element;
export default FullCardPlayer;
//# sourceMappingURL=FullCardPlayer.d.ts.map