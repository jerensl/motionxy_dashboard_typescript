import type { NextPage } from 'next'
import Head from 'next/head'
import { ForgotPassword } from '../../components/ForgotPassword'

const ResendEmailVerification: NextPage = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <ForgotPassword />
        </>
    )
}

export default ResendEmailVerification
