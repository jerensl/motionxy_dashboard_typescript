import * as React from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import cookies from 'js-cookie'

const AuthContext = React.createContext<{ user: User | null }>({
    user: null,
})

export function AuthProvider({ children }: any) {
    const [user, setUser] = React.useState<User | null>(null)

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
            } else {
                setUser(null)
                cookies.remove('auth')
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = (): { user: User | null } => {
    return React.useContext<{ user: User | null }>(AuthContext)
}
