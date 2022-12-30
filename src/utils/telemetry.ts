import Cookies from 'js-cookie'
import { IQueryTelemetry, IQueryTelemetryRealtime } from '../types/device'
import { IRealtimeData, ITelemetryData } from '../types/telemetry'

export function getTelemetryData({
    deviceShortName,
    sensors,
    page,
}: IQueryTelemetry): Promise<ITelemetryData> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    const query = '&' + sensors?.map((sensor) => `sensor=${sensor}`).join('&')

    return window
        .fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/telemetry?deviceShortName=${deviceShortName}&page=${page}` +
                query,
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

export function getTelemetryDataCSV({
    deviceShortName,
    sensors,
}: Pick<IQueryTelemetry, 'deviceShortName' | 'sensors'>) {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    const query = '&' + sensors?.map((sensor) => `sensor=${sensor}`).join('&')

    return window.fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/api/telemetry/export?deviceShortName=${deviceShortName}` +
            query,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
            },
        }
    )
}

export function getTelemetryRealTime({
    deviceShortName,
    sensors,
}: IQueryTelemetryRealtime): Promise<IRealtimeData> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    const query = '&' + sensors?.map((sensor) => `sensor=${sensor}`).join('&')

    return window
        .fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/telemetry/realtime?deviceShortName=${deviceShortName}` +
                query,
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
