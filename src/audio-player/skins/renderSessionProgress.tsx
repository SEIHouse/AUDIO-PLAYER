import { useCallback } from "react"
import type { AudioPlayerTheme, SessionEngine } from "../types"
import { ProgressBar } from "../components/ProgressBar"

interface SessionProgressProps extends AudioPlayerTheme {
    session: SessionEngine
    hostId: string
    height?: number
}

export function SessionProgress({
    session,
    hostId,
    height,
    accentColor,
    progressColor,
    trackColor,
}: SessionProgressProps) {
    const currentTrack = session.currentTrack
    const handleSeekStart = useCallback(() => session.setSeeking(true), [session])
    const handleSeekEnd = useCallback(() => session.setSeeking(false), [session])

    const rendered = session.renderPluginSlot("progress", {
        hostId,
        currentTime: session.currentTime,
        duration: session.duration,
        buffered: session.buffered,
        disabled: !session.hasAudio,
        isSeeking: session.isSeeking,
        onSeek: session.seek,
        onSeekStart: handleSeekStart,
        onSeekEnd: handleSeekEnd,
        currentTrack,
        sourceKey: session.sourceKey,
        peaks: currentTrack?.peaks,
        peaksDuration: currentTrack?.waveformDuration,
        getDecodedData: session.getDecodedData,
        url:
            session.getBackendInfo().active === "html5"
                ? currentTrack?.audioFile?.trim()
                : undefined,
        height,
        waveColor: trackColor,
        progressColor,
        cursorColor: accentColor,
    })

    return rendered ?? (
        <ProgressBar
            currentTime={session.currentTime}
            duration={session.duration}
            buffered={session.buffered}
            disabled={!session.hasAudio}
            isSeeking={session.isSeeking}
            onSeek={session.seek}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
        />
    )
}
