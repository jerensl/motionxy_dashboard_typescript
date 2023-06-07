import Head from 'next/head'
import React from 'react'
import { DeviceCard } from '../../components/Card/Device.card'
import Layout from '../../components/Layout'
import NewDeviceModal from '../../components/Modal/NewDevice.modal'
import { useDevices } from '../../features/device/query'
import { NextPageWithLayout } from '../_app'
import { Grid } from '../../components/Grid'

const DevicePage: NextPageWithLayout = () => {
    const [newDeviceOpen, setNewDeviceOpen] = React.useState(false)
    const { data: devices } = useDevices()
    const handleNewDeviceOpen = () => {
        setNewDeviceOpen(true)
    }

    const handleNewDeviceClosed = () => {
        setNewDeviceOpen(false)
    }

    return (
        <>
            <Head>
                <title>Ovord 2</title>
                <meta name="description" content="Ovord 2 Dashboard" />
            </Head>
            <div className="flex flex-col mt-10 max-w-full px-10">
                <button
                    onClick={handleNewDeviceOpen}
                    className="m-auto text-white bg-primary hover:bg-primary/85 focus:ring-4 focus:outline-none focus:ring-primary/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 "
                >
                    Add new device
                </button>
                <NewDeviceModal
                    isOpen={newDeviceOpen}
                    handleClose={handleNewDeviceClosed}
                />
                <Grid>
                    {devices?.map(
                        ({ deviceName, deviceShortName, token }: any) => (
                            <DeviceCard
                                key={deviceShortName}
                                deviceName={deviceName}
                                deviceShortName={deviceShortName}
                                token={token}
                            />
                        )
                    )}
                </Grid>
            </div>
        </>
    )
}

DevicePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default DevicePage
