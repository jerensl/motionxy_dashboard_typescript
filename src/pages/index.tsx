import { signOut } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../context/useAuth'
import { auth } from '../utils/firebase'

const Home: NextPage = () => {
    const router = useRouter()
    const { user, loading } = useAuth()

    if (!user || loading) {
        return <p>loading</p>
    }

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <h1>Welcome</h1>{' '}
            <button onClick={() => signOut(auth).then(() => router.push('/'))}>
                Logout
            </button>
        </>
    )
}

export default Home
