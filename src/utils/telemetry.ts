import Cookies from 'js-cookie'
import { IQueryTelemetry } from '../types/device'
import { ITelemetryData } from '../types/telemetry'

export function getTelemetryData({
    deviceShortName,
}: IQueryTelemetry): Promise<Array<ITelemetryData>> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/telemetry?deviceShortName=${deviceShortName}`,
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

export function getTelemetryRealTime({
    deviceShortName,
}: IQueryTelemetry): Promise<Array<ITelemetryData>> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(
            `${process.env.NEXT_PUBLIC_REST_API}/api/telemetry/realtime?deviceShortName=${deviceShortName}`,
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
