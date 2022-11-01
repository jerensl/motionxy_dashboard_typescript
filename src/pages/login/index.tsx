import type { NextPage } from 'next'
import Head from 'next/head'
import { Login } from '../../components/Login'

const LoginPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <Login />
        </>
    )
}

export default LoginPage
