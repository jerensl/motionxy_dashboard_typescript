import type { NextPage } from 'next'
import Head from 'next/head'
import { Login } from '../../components/Login'

const LoginPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>MotionXY</title>
                <meta name="description" content="MotionXY Dashboard" />
            </Head>
            <Login />
        </>
    )
}

export default LoginPage
