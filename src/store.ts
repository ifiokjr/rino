import { Note, User, getCurrentUser, theme } from "src/controller"
import { createContainer } from "unstated-next"
import { useMemo, useState } from "react"

const useAuth = () => {
    const [user, setUser] = useState<User | null>(getCurrentUser())
    const email: string | null = useMemo(() => user?.email || null, [user])
    return { user, email, setUser }
}

const useEdit = () => {
    const [note, setNote] = useState<Note | null>(null)
    const [notes, setNotes] = useState<Note[] | null>(null)
    // renderKey is a number between 1 to 1000. Re-render NoteListItem when renderKey changes
    const [renderKey, setRenderKey] = useState(1)
    const updateRenderKey = () => setRenderKey(key => (key >= 1000 ? 1 : key + 1))
    return { notes, setNotes, note, setNote, renderKey, updateRenderKey }
}

const useTheme = () => {
    const [isDarkTheme, setDarkTheme] = useState(theme.getTheme() === "dark")
    const toggleTheme = () => {
        const newAppTheme = isDarkTheme ? "light" : "dark"
        theme.setTheme(newAppTheme)
        setDarkTheme(!isDarkTheme)
    }
    return { isDarkTheme, toggleTheme }
}

const useLoading = () => {
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingData, setLoadingData] = useState(true)
    const loading = useMemo(() => loadingUser || loadingData, [loadingData, loadingUser])

    return {
        loadingUser,
        setLoadingUser,
        loadingData,
        setLoadingData,
        loading,
    }
}

const useNetworkState = () => {
    const [connected, setConnected] = useState(false)
    const loadingState = useLoading()
    return {
        setConnected,
        connected,
        ...loadingState,
    }
}

const useUiState = () => {
    const [drawerActivity, setDrawerActivity] = useState(true)

    const { isDarkTheme, toggleTheme } = useTheme()
    const [debug, setDebug] = useState(0)
    const updateDebug = () => setDebug(n => n + 1)

    return {
        drawerActivity,
        setDrawerActivity,
        isDarkTheme,
        toggleTheme,
        debug,
        updateDebug,
    }
}

const useStore = () => {
    return {
        auth: useAuth(),
        state: { ...useUiState(), ...useNetworkState() },
        edit: useEdit(),
    }
}

export const StoreContainer = createContainer(useStore)

// export const UiContainer = createContainer(useUiState)
// export const EditContainer = createContainer(useEdit)
// export const AuthContainer = createContainer(useAuth)
// export const NetworkContainer = createContainer(useNetworkState)