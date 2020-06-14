import { List } from "@material-ui/core"
import React from "react"

import { Note } from "src/controller"
import { useIsMobile } from "src/hooks"
import { StoreContainer } from "src/store"

import { NoteListItem } from "./NoteListItem"
import { useBodyStyles } from "./style"

export const NoteList: React.FC<{
    visibleNotes: Note[]
    noteKey: string | null
    setNoteKey: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ visibleNotes, noteKey, setNoteKey }) => {
    const classes = useBodyStyles()
    const {
        state: { setDrawerActivity },
    } = StoreContainer.useContainer()

    const isMobile = useIsMobile()

    const selectNote = (key: string) => {
        setNoteKey(key)
        if (isMobile) setDrawerActivity(false)
    }

    return (
        <List className={classes.drawerBody} data-testid="sidebar-notes">
            {visibleNotes.map((note) => (
                <NoteListItem
                    key={note.key}
                    note={note}
                    selected={note.key === noteKey}
                    onClick={() => selectNote(note.key)}
                />
            ))}
        </List>
    )
}