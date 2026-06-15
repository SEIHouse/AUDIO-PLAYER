export interface VisualLyricsWorkspaceProps {
    /** Current track lyrics, when available. Threaded through later so this
     *  surface can render alongside the existing LyricsPlugin state instead of
     *  owning its own copy. */
    lyrics?: string
}

/* Lyrics settings workspace. For now it is a placeholder that mirrors the
   existing LyricsPlugin: when the host passes the active track's lyrics it
   previews them, otherwise it explains where lyrics configuration will live.
   Kept free of a direct LyricsPlugin import so the shell stays decoupled from
   the engine — the host owns plugin state and passes a snapshot in. */
export function VisualLyricsWorkspace({ lyrics }: VisualLyricsWorkspaceProps) {
    return (
        <div className="sap-ctl__workspace-empty">
            <p className="sap-ctl__workspace-lead">Lyrics</p>
            {lyrics ? (
                <div className="sap-ctl__lyrics">{lyrics}</div>
            ) : (
                <p className="sap-ctl__workspace-sub">
                    Lyrics display and sync settings will appear here.
                </p>
            )}
        </div>
    )
}

export default VisualLyricsWorkspace
