import type { NextPage } from 'next'
import Head from 'next/head'
import { SignUp } from '../../components/SignUp'

const SignUpPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <SignUp />
        </>
    )
}

export default SignUpPage
