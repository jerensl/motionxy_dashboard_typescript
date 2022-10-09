import * as React from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import auth from '../utils/firebase'
import cookies from 'js-cookie'
import Router from 'next/router'

const AuthContext = React.createContext<{
    user: User | null
    loading: boolean
}>({
    user: null,
    loading: true,
})

export function AuthProvider({ children }: any) {
    const [user, setUser] = React.useState<User | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const userFromCookie = cookies.get('auth')
        if (userFromCookie) {
            setUser(JSON.parse(userFromCookie))
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await user.getIdToken(true)
                setUser(user)
                cookies.set('auth', JSON.stringify(user), { expires: 1 / 24 })
                Router.push('/')
            } else {
                setUser(null)
                cookies.remove('auth')
                Router.push('/login')
            }
        })

        setLoading(false)
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): { user: User | null; loading: boolean } => {
    return React.useContext<{ user: User | null; loading: boolean }>(
        AuthContext
    )
}
