import Head from 'next/head'
import Layout from '../../components/Layout'
import { NextPageWithLayout } from '../_app'

const DevicePage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="ml-80 mt-10 max-w-4xl"></div>
        </>
    )
}

DevicePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default DevicePage
