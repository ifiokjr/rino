import { FirebaseError } from "firebase"
import React, { useMemo } from "react"

import { AuthForm, SubmitButton, UsernameTextField } from "src/components/Auth/Auth"
import { sendPasswordResetEmail } from "src/controller/auth/actions"
import { AuthContainer } from "src/controller/auth/hook"

type PasswordResetProps = {
    email: string
    setEmail: (val: string) => void
    progressing: boolean
    setProgressing: (val: boolean) => void
    setProgressed: (val: boolean) => void
    setError: (val: string) => void
}

export default function PasswordReset({
    email,
    setEmail,
    progressing,
    setProgressing,
    setProgressed,
    setError,
}: PasswordResetProps) {
    const disableSubmit = useMemo(() => !email || progressing, [email, progressing])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setProgressing(true)
        setError("")
        sendPasswordResetEmail(email)
            .then(() => {
                setProgressed(true)
                setProgressing(false)
            })
            .catch((error: FirebaseError) => {
                console.error(error)

                if (error?.code === "auth/user-not-found") {
                    setError("Couldn't find your Rino account")
                } else {
                    setError(String(error))
                }
                setProgressing(false)
            })
        event.preventDefault()
    }
    return (
        <AuthContainer.Provider>
            <AuthForm onSubmit={handleSubmit} data-testid="auth_password_reset_form">
                <UsernameTextField
                    disabled={progressing}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ "data-testid": "auth_password_reset_username_textfield" }}
                />
                <SubmitButton disabled={disableSubmit} data-testid="auth_password_reset_submit">
                    Next
                </SubmitButton>
            </AuthForm>
        </AuthContainer.Provider>
    )
}
