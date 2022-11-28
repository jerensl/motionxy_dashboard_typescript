import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import Telemetry from '../../components/Table/Telemetry.mainTable'
import { useDevices } from '../../features/device/query'
import { useTelemetry } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { getTelemetryDataCSV } from '../../utils/telemetry'
import { NextPageWithLayout } from '../_app'

const TelemetryPage: NextPageWithLayout = () => {
    const [page, setPage] = React.useState(0)
    const { data: devices } = useDevices()
    const [device, setDevice] = useState<IDevice | null>(null)
    const { data: telemetry } = useTelemetry({
        deviceShortName: device?.deviceShortName,
        page: page,
    })

    const handleDownloadCSV = async () => {
        await getTelemetryDataCSV({
            deviceShortName: device?.deviceShortName,
        })
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'export.csv'
                document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click()
                a.remove() //afterwards we remove the element again
            })
    }

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col pl-80 max-w-full max-h-full px-10">
                <div className="flex flex-row justify-between ">
                    <ListDevice
                        devices={devices}
                        device={device}
                        setDevice={setDevice}
                    />
                    <button
                        onClick={handleDownloadCSV}
                        className="m-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                        Download CSV
                    </button>
                </div>

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
