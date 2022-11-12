import * as React from 'react'
import { User, onIdTokenChanged } from 'firebase/auth'
import auth from '../utils/firebase'
import cookies from 'js-cookie'
import Router from 'next/router'

const AuthContext = React.createContext<{
    user: User | null
    isLoading: boolean
}>({
    user: null,
    isLoading: true,
})

export function AuthProvider({ children }: any) {
    const [user, setUser] = React.useState<User | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const userFromCookie = cookies.get('auth')
        if (userFromCookie) {
            setUser(JSON.parse(userFromCookie))
        }

        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                setUser(user)
                cookies.set('auth', JSON.stringify(user), { expires: 1 / 24 })
                Router.push('/')
            } else {
                setUser(null)
                cookies.remove('auth')
                Router.push('/login')
            }
        })

        setIsLoading(false)
        return () => unsubscribe()
    }, [])

    React.useEffect(() => {
        const intervalID = setInterval(async () => {
            const user = auth.currentUser
            if (user) await user.getIdToken(true)
        }, 10 * 60 * 1000)

        return () => clearInterval(intervalID)
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): { user: User | null; isLoading: boolean } => {
    return React.useContext<{ user: User | null; isLoading: boolean }>(
        AuthContext
    )
}
