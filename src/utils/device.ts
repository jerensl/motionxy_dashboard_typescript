import Cookies from 'js-cookie'
import {
    IDeletedDevice,
    IDevices,
    IDevice,
    INewDevice,
    IQueryDevice,
} from '../types/device'

export function createNewDevice({
    deviceName,
    deviceShortName,
    sensors,
}: INewDevice): Promise<any> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window.fetch(`${process.env.NEXT_PUBLIC_REST_API}/api/device/new`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            deviceName,
            deviceShortName,
            sensors,
        }),
        headers: {
            Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
        },
    })
}

export function deleteDevice({ deviceShortName }: IDeletedDevice) {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window.fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/api/device/delete`,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                deviceShortName,
            }),
            headers: {
                Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
            },
        }
    )
}

export async function getDevices(): Promise<IDevices> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(`${process.env.NEXT_PUBLIC_REST_API}/api/devices`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
            },
        })
        .then((data) => data.json())
}

export async function getDevice({
    deviceShortName,
}: IQueryDevice): Promise<IDevice> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/device?deviceShortName=${deviceShortName}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Authorization:
                        'Bearer ' + user?.stsTokenManager.accessToken,
                },
            }
        )
        .then((data) => data.json())
}
