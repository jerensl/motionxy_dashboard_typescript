import Cookies from 'js-cookie'
import { IStats } from '../types/user'

export function getStats(): Promise<IStats> {
    const userFromCookie = Cookies.get('auth')

    if (userFromCookie === undefined) {
        return Promise.reject()
    }

    const user = JSON.parse(userFromCookie)

    return window
        .fetch(`${process.env.NEXT_PUBLIC_REST_API}/api/user/stats`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'Bearer ' + user?.stsTokenManager.accessToken,
            },
        })
        .then((data) => data.json())
}
