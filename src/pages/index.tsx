import { signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Login } from '../components/Login'
import { useAuth } from '../context/useAuth'
import { auth } from '../utils/firebase'

const Home: NextPage = () => {
    const router = useRouter()
    const { user } = useAuth()

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            {user?.uid ? (
                <>
                    <h1>Welcome</h1>{' '}
                    <button
                        onClick={() =>
                            signOut(auth).then(() => router.push('/'))
                        }
                    >
                        Logout
                    </button>
                </>
            ) : (
                <Login />
            )}
        </>
    )
}

export default Home
