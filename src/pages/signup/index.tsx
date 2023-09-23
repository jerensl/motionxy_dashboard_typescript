import type { NextPage } from 'next'
import Head from 'next/head'
import { SignUp } from '../../components/SignUp'

const SignUpPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>MotionXY</title>
                <meta name="description" content="MotionXY Dashboard" />
            </Head>
            <SignUp />
        </>
    )
}

export default SignUpPage
