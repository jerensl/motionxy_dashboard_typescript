import Cookies from 'js-cookie'

interface NewDevice {
    deviceName: string
    deviceShortName: string
}

export function createNewDevice({ deviceName, deviceShortName }: NewDevice) {
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
            deviceShortName,
        }),
        headers: {
            Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
        },
    })
}

export function deleteDevice({
    deviceShortName,
}: Pick<NewDevice, 'deviceShortName'>) {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window.fetch('https://cec.azurewebsites.net/api/device/delete', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            deviceShortName,
        }),
        headers: {
            Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
        },
    })
}

export function getDevices() {
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
