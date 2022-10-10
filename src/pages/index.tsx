import Head from 'next/head'
import Layout from '../components/Layout'
import { Navbar } from '../components/Navbar'
import { useAuth } from '../context/useAuth'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
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
        </>
    )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
