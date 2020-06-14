import { createStyles, makeStyles, Theme } from "@material-ui/core"
import clsx from "clsx"
import React from "react"

import { maxDrawerWidth } from "src/constants"
import { EditContainer } from "src/controller"
import { Editor } from "src/editor/components"
import { StoreContainer } from "src/store"

import { Welcome } from "./Welcome"

const useStyles = makeStyles((theme: Theme) => {
    const padding = theme.spacing(3)
    return createStyles({
        content: {
            padding: padding,
            transition: theme.transitions.create("padding", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),

            width: "100%",
            minHeight: "100vh",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        contentShift: {
            [theme.breakpoints.up("md")]: {
                paddingLeft: maxDrawerWidth + padding,
                transition: theme.transitions.create("padding", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    })
})

export const Content: React.FC = () => {
    const classes = useStyles()

    const {
        state: { drawerActivity },
    } = StoreContainer.useContainer()

    const { setNoteContent, note } = EditContainer.useContainer()

    return (
        <main
            className={clsx(classes.content, { [classes.contentShift]: drawerActivity })}
            data-testid="main"
        >
            {note ? (
                <Editor
                    note={note}
                    setNoteContent={setNoteContent}
                    autoFocus={false}
                    key={note.key}
                />
            ) : (
                <Welcome />
            )}
        </main>
    )
}