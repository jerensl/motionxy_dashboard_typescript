export function createNewUser(
    fullName: string,
    email: string,
    password: string
) {
    return window.fetch('https://cec.azurewebsites.net/api/user/new', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
            fullName,
            email,
            password,
        }),
    })
}
