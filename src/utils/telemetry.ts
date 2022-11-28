import Cookies from 'js-cookie'
import { IQueryTelemetry, IQueryTelemetryRealtime } from '../types/device'
import { ITelemetryData } from '../types/telemetry'

export function getTelemetryData({
    deviceShortName,
}: IQueryTelemetry): Promise<ITelemetryData> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(
            `${
                process.env.NEXT_PUBLIC_REST_API
            }/api/telemetry?deviceShortName=${deviceShortName}&page=${0}`,
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
}: IQueryTelemetryRealtime): Promise<Array<ITelemetryData>> {
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
