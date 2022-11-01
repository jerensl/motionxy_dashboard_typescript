import Cookies from 'js-cookie'

export function createNewDevice(deviceName: string) {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window.fetch('https://cec.azurewebsites.net/api/device/new', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            deviceName,
        }),
        headers: {
            Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
        },
    })
}

export function getDevices(bearerToken: any) {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch('https://cec.azurewebsites.net/api/devices', {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
            },
        })
        .then((data) => data.json())
}
