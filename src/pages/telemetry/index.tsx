import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import TelemetryTable from '../../components/Table/Telemetry.mainTable'
import { queryClient, useDevice, useDevices } from '../../features/device/query'
import { useTelemetry } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { getTelemetryDataCSV } from '../../utils/telemetry'
import { NextPageWithLayout } from '../_app'
import SensorsDropdown from '../../components/Dropdown/Sensors.dropdown'

const TelemetryPage: NextPageWithLayout = () => {
    const [page, setPage] = React.useState(1)
    const [sensor, setSensor] = useState<Array<string>>([])
    const [device, setDevice] = useState<IDevice | null>(null)
    const {
        data: devices,
        isLoading: devicesIsLoading,
        isError: devicesIsError,
    } = useDevices()
    const {
        data: telemetry,
        isLoading: telemetryIsLoading,
        isError: telemetryIsError,
    } = useTelemetry({
        deviceShortName: device?.deviceShortName,
        sensors: sensor,
        page: page,
    })
    const {
        data: deviceDetail,
        isLoading: deviceIsLoading,
        isError: deviceIsError,
    } = useDevice({ deviceShortName: device?.deviceShortName ?? '' })

    const handleDownloadCSV = async () => {
        await getTelemetryDataCSV({
            deviceShortName: device?.deviceShortName,
            sensors: sensor,
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

    const handleCheckSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...sensor]
        if (event.target.checked) {
            updatedList = [...sensor, event.target.value]
        } else {
            updatedList.splice(sensor.indexOf(event.target.value), 1)
        }
        setSensor(updatedList)
    }

    useEffect(() => {
        setSensor([])
    }, [device])

    if (telemetryIsError || devicesIsError || deviceIsError) {
        return (
            <>
                <Head>
                    <title>Ovord 2</title>
                    <meta name="description" content="Ovord 2 Dashboard" />
                </Head>
                <div>Something wrong...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col pl-80 max-w-full max-h-full px-10">
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-row gap-8">
                        <ListDevice
                            devices={devices}
                            device={device}
                            setDevice={setDevice}
                        />
                        {deviceDetail !== undefined && (
                            <SensorsDropdown
                                sensor={sensor}
                                sensors={deviceDetail.sensors}
                                handleCheckSensor={handleCheckSensor}
                            />
                        )}
                    </div>
                    <button
                        onClick={handleDownloadCSV}
                        className="m-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                        Download CSV
                    </button>
                </div>
                {!telemetryIsLoading && device?.deviceShortName && (
                    <TelemetryTable
                        deviceShortName={device.deviceShortName ?? ''}
                        telemetry={telemetry}
                        page={page}
                        setPage={setPage}
                    />
                )}
            </div>
        </>
    )
}

TelemetryPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default TelemetryPage
