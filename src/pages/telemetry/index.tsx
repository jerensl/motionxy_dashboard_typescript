import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import Telemetry from '../../components/Table/Telemetry.mainTable'
import { useDevices } from '../../features/device/query'
import { useTelemetry } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { NextPageWithLayout } from '../_app'

const TelemetryPage: NextPageWithLayout = () => {
    const [page, setPage] = React.useState(0)
    const { data: devices } = useDevices()
    const [device, setDevice] = useState<IDevice | null>(null)
    const { data: telemetry } = useTelemetry({
        deviceShortName: device?.deviceShortName,
        page: page,
    })

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col pl-80 max-w-full max-h-full px-10">
                <ListDevice
                    devices={devices}
                    device={device}
                    setDevice={setDevice}
                />
                <Telemetry
                    deviceShortName={device?.deviceShortName}
                    telemetry={telemetry}
                />
            </div>
        </>
    )
}

TelemetryPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default TelemetryPage
