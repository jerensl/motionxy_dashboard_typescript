import type { NextPage } from 'next'
import Head from 'next/head'
import { EmailVerification } from '../../components/EmailVerification'

const ResendEmailVerification: NextPage = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <EmailVerification />
        </>
    )
}

export default ResendEmailVerification
