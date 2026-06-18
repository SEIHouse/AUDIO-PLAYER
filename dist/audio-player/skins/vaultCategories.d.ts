import { VaultCategory } from '../types';
/** Visual identity for a Vault category: a short status label and an accent color. */
export interface VaultCategoryMeta {
    /** Short, human label shown as the row's status chip. */
    label: string;
    /** Accent color (CSS color) used for the row's category dot/border. */
    color: string;
}
/**
 * Vault category → visual identity. Rows derive their color/status from this map
 * (driven by `Track.vaultCategory`) instead of depending on per-row artwork, so
 * a long list stays fast, clean, and scannable.
 *
 * Colors are plain CSS values so the host can keep using its own theme tokens
 * elsewhere; override per row via the existing `AudioPlayerTheme` props when a
 * different palette is needed.
 */
export declare const VAULT_CATEGORY_META: Record<VaultCategory, VaultCategoryMeta>;
/** Look up a category's visual identity, or `null` when none is set. */
export declare function getVaultCategoryMeta(category: VaultCategory | undefined): VaultCategoryMeta | null;
//# sourceMappingURL=vaultCategories.d.ts.map