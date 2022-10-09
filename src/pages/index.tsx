import { signOut } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Navbar } from '../components/Navbar'
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
            <Navbar />
            <h1>Welcome</h1>{' '}
            <button
                onClick={() => signOut(auth).then(() => router.push('/'))}
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
                Logout
            </button>
        </>
    )
}

export default Home
