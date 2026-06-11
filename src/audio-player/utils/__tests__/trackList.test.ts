import { describe, expect, it } from "vitest"
import type { Track } from "../../types"
import { resolveTrackList } from "../trackList"

describe("resolveTrackList", () => {
    it("reuses a stable empty queue when tracks are omitted", () => {
        expect(resolveTrackList(undefined)).toBe(resolveTrackList(undefined))
    })

    it("preserves caller-provided track arrays", () => {
        const tracks: Track[] = [
            {
                title: "First Light",
                artist: "SEIHouse",
                audioFile: "/first-light.mp3",
            },
        ]

        expect(resolveTrackList(tracks)).toBe(tracks)
    })
})
