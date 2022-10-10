import Head from 'next/head'
import Layout from '../components/Layout'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
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
