import Head from 'next/head'
import { useEffect, useState } from 'react'
import Chart from '../../components/Chart'
import Layout from '../../components/Layout'
import { useDevice, useDevices } from '../../features/device/query'
import { useTelemetryRealTime } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { NextPageWithLayout } from '../_app'
import dayjs from 'dayjs'
import { Rnd } from 'react-rnd'
import { MenuDropdown } from '../../components/Dropdown/Menu.dropdown'

const Realtime: NextPageWithLayout = () => {
    const [device, setDevice] = useState<IDevice | null>(null)
    const [sensor, setSensor] = useState<Array<string>>([])
    const {
        data: devices,
        isLoading: devicesIsLoading,
        isSuccess: devicesIsSuccess,
        isError: devicesIsError,
    } = useDevices()

    const {
        data: deviceDetail,
        isLoading: deviceIsLoading,
        isSuccess: deviceIsSuccess,
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

    useEffect(() => {
        setSensor([])
    }, [device])

    if (telemetryIsError || devicesIsError || deviceIsError) {
        return (
            <>
                <Head>
                    <title>MotionXY</title>
                    <meta name="description" content="MotionXY Dashboard" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#90cdf4" />
                </Head>
                <div className="max-w-4xl">Something wrong...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>MotionXY</title>
                <meta name="description" content="MotionXY Dashboard" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#90cdf4" />
            </Head>
            <div className="max-w-6xl min-h-[90vh] w-full h-full">
                <Rnd
                    bounds="parent"
                    default={{
                        x: 0,
                        y: 0,
                        width: 450,
                        height: 450,
                    }}
                    className="bg-white p-3 border border-black"
                >
                    {devicesIsSuccess && (
                        <MenuDropdown
                            devices={devices}
                            setDevice={setDevice}
                            setSensor={setSensor}
                            sensors={deviceDetail?.sensors ?? []}
                            sensorChecked={sensor}
                        />
                    )}
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
                </Rnd>
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
