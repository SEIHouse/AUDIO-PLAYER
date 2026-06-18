export declare function useLocalStorage<T>(key: string, initialValue: T, debounceMs?: number): [T, (value: T | ((val: T) => T)) => void];
export interface PlaybackState {
    trackId: string;
    currentTime: number;
}
export declare function savePlaybackState(state: PlaybackState): void;
export declare function loadPlaybackState(): PlaybackState | null;
export declare function clearPlaybackState(): void;
//# sourceMappingURL=storage.d.ts.map