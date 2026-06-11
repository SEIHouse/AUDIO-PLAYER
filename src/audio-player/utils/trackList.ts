import type { Track } from "../types"

const EMPTY_TRACKS: Track[] = []

export function resolveTrackList(tracks: Track[] | undefined): Track[] {
    return tracks ?? EMPTY_TRACKS
}
