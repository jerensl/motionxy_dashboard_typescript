import Head from 'next/head'
import { useEffect, useState } from 'react'
import Chart from '../../components/Chart'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import { useDevice, useDevices } from '../../features/device/query'
import { useTelemetryRealTime } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { NextPageWithLayout } from '../_app'
import SensorsDropdown from '../../components/Dropdown/Sensors.dropdown'
import dayjs from 'dayjs'

const Realtime: NextPageWithLayout = () => {
    const [device, setDevice] = useState<IDevice | null>(null)
    const [sensor, setSensor] = useState<Array<string>>([])
    const {
        data: devices,
        isLoading: devicesIsLoading,
        isError: devicesIsError,
    } = useDevices()

    const {
        data: deviceDetail,
        isLoading: deviceIsLoading,
        isError: deviceIsError,
    } = useDevice({ deviceShortName: device?.deviceShortName ?? '' })

    const {
        data: telemetry,
        isLoading: telemetryIsLoading,
        isError: telemetryIsError,
    } = useTelemetryRealTime({
        deviceShortName: device?.deviceShortName,
        sensors: sensor,
    })

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
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#90cdf4" />
                </Head>
                <div className="ml-80 max-w-4xl">Something wrong...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#90cdf4" />
            </Head>
            <div className="ml-80 max-w-4xl">
                <div className="flex flex-row m-auto gap-4">
                    <ListDevice
                        devices={devices}
                        device={device}
                        setDevice={setDevice}
                    />
                    <SensorsDropdown
                        sensor={sensor}
                        sensors={deviceDetail?.sensors}
                        handleCheckSensor={handleCheckSensor}
                    />
                </div>
                {!telemetryIsLoading ? (
                    <Chart
                        deviceName={telemetry.deviceName}
                        sensors={telemetry.sensors}
                        data={telemetry.data}
                        timestamps={telemetry.timestamps.map((value) =>
                            dayjs(value).format('h:mm:ss A')
                        )}
                    />
                ) : (
                    'Select your device and sensor first'
                )}
                {/* <button className="fixed z-50 bottom-10 right-8 bg-primary w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-orange-400 hover:drop-shadow-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button> */}
            </div>
        </>
    )
}

Realtime.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default Realtime
