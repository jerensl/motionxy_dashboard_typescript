import Head from 'next/head'
import React from 'react'
import Layout from '../../components/Layout'
import { NextPageWithLayout } from '../_app'

const TelemetryPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col ml-80 mt-10 max-w-full px-10"></div>
        </>
    )
}

TelemetryPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default TelemetryPage
