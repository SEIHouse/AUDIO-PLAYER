import { CSSProperties } from 'react';
import { AudioPlayerTheme, Track } from '../types';
export interface VaultRowPlayerProps extends AudioPlayerTheme {
    /** The track this row represents. */
    track: Track;
    /** Optional 1-based number shown at the left of the row. */
    number?: number;
    /**
     * Action entry point for this row (opens the host's row actions: add to
     * playlist, share, edit, etc.). Deep actions belong to the container; the
     * row only surfaces the affordance. The action button is part of the compact
     * family contract (`faceSupportsAction("vaultRow")`).
     */
    onAction?: (track: Track) => void;
    className?: string;
    style?: CSSProperties;
}
/**
 * A slim Vault list row. Each row controls the shared session: pressing play
 * starts this track in the one global engine (jumping if it's already queued,
 * else appending). When this row is the active track its play button mirrors the
 * global play state — so it stays in sync with every other skin.
 *
 * Capability-driven (`PLAYER_FACE_CAPABILITIES.vaultRow`, CompactPlayer family):
 * the most compact face. `supportsSEICanvas: false`, `supportsContextualActions:
 * false`, and `supportsScrubberCanvas: false` — a list row mounts **no** scrubber
 * of its own; seeking lives on the shared StickyBottom master scrubber that
 * follows the active song. It keeps `supportsAction: true`, so it renders a row
 * action button. Visual identity comes from the track's `vaultCategory` (accent
 * color + status label), not per-row artwork, keeping long lists fast to render.
 */
export declare function VaultRowPlayer({ track, number, onAction, className, style, ...theme }: VaultRowPlayerProps): import("react").JSX.Element;
export default VaultRowPlayer;
//# sourceMappingURL=VaultRowPlayer.d.ts.map