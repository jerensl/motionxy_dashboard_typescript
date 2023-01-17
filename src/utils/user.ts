export async function createNewUser(
    fullName: string,
    email: string,
    password: string
) {
    return window.fetch(`${process.env.NEXT_PUBLIC_REST_API}/api/user/new`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            fullName,
            email,
            password,
        }),
    })
}

export async function resendVerificationEmail(email: string) {
    return window.fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/api/user/resend-email-verification`,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email,
            }),
        }
    )
}
