export function createNewUser(
    fullName: string,
    email: string,
    password: string
) {
    return window.fetch('/api/user/new', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            fullName,
            email,
            password,
        }),
    })
}
