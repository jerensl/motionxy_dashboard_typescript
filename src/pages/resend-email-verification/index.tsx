import type { NextPage } from 'next'
import Head from 'next/head'
import { EmailVerification } from '../../components/EmailVerification'

const ResendEmailVerification: NextPage = () => {
    return (
        <>
            <Head>
                <title>MotionXY</title>
                <meta name="description" content="MotionXY Dashboard" />
            </Head>
            <EmailVerification />
        </>
    )
}

export default ResendEmailVerification
