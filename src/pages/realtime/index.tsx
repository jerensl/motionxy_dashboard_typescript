import Head from 'next/head'
import { useEffect, useState } from 'react'
import Chart from '../../components/Chart'
import Layout from '../../components/Layout'
import ListDevice from '../../components/ListDevice'
import { useDevices } from '../../features/device/query'
import { useTelemetryRealTime } from '../../features/telemetry'
import { IDevice } from '../../types/device'
import { NextPageWithLayout } from '../_app'
import SensorsDropdown from '../../components/Dropdown/Sensors.dropdown'

const Realtime: NextPageWithLayout = () => {
    const {
        data: devices,
        isLoading: deviceIsLoading,
        isError: deviceIsError,
    } = useDevices()
    const [sensor, setSensor] = useState<Array<string>>([])
    const [device, setDevice] = useState<IDevice | null>(null)
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

    if (telemetryIsError || deviceIsError) {
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
                        sensors={device?.sensors}
                        handleCheckSensor={handleCheckSensor}
                    />
                </div>
                {!telemetryIsLoading && sensor.length > 0 ? (
                    <Chart
                        deviceName={telemetry.deviceName}
                        sensors={telemetry.sensors}
                        data={telemetry.data}
                    />
                ) : null}
            </div>
        </>
    )
}

Realtime.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default Realtime
