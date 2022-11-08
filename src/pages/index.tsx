import Head from 'next/head'
import { useState } from 'react'
import Chart from '../components/Chart'
import Layout from '../components/Layout'
import ListDevice from '../components/ListDevice'
import { useDevices } from '../features/device/query'
import { useTelemetryRealTime } from '../features/telemetry'
import { IDevice } from '../types/device'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
    const { data: devices } = useDevices()
    const [device, setDevice] = useState<IDevice | null>(null)
    const { data: telemetry } = useTelemetryRealTime({
        deviceShortName: device?.deviceShortName,
    })
    const value1 = telemetry?.map(({ value1 }) => value1) ?? []
    console.log(value1)
    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#90cdf4" />
            </Head>
            <div className="ml-80 max-w-4xl">
                <ListDevice
                    devices={devices}
                    device={device}
                    setDevice={setDevice}
                />
                <Chart value1={value1} />
            </div>
        </>
    )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
