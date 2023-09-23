import type { NextPage } from 'next'
import Head from 'next/head'
import { ForgotPassword } from '../../components/ForgotPassword'

const ResendEmailVerification: NextPage = () => {
    return (
        <>
            <Head>
                <title>MotionXY</title>
                <meta name="description" content="MotionXY Dashboard" />
            </Head>
            <ForgotPassword />
        </>
    )
}

export default ResendEmailVerification
