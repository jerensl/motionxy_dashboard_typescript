export function createNewUser(
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
