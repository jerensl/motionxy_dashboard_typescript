import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import Telemetry from '../../components/Table/Telemetry.mainTable'
import { useDevices } from '../../features/device/query'
import { IDevice } from '../../types/device'
import { NextPageWithLayout } from '../_app'

const TelemetryPage: NextPageWithLayout = () => {
    const { data: devices, isSuccess } = useDevices()
    const [device, setDevice] = useState<IDevice | null>(null)

    if (!isSuccess) {
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

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col ml-80 mt-10 max-w-full px-10">
                <ListDevice
                    devices={devices}
                    device={device}
                    setDevice={setDevice}
                />
                <Telemetry />
            </div>
        </>
    )
}

TelemetryPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default TelemetryPage
