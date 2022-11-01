import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import React from 'react'
import { DeviceCard } from '../../components/Card/Device.card'
import Layout from '../../components/Layout'
import NewDeviceModal from '../../components/Modal/NewDevice.modal'
import { useAuth } from '../../context/useAuth'
import { getDevices } from '../../utils/device'
import { NextPageWithLayout } from '../_app'

const DevicePage: NextPageWithLayout = () => {
    const [newDeviceOpen, setNewDeviceOpen] = React.useState(false)
    const { user } = useAuth()
    const { data: devices } = useQuery({
        queryKey: ['devices', user?.getIdTokenResult],
        queryFn: getDevices,
        enabled: !!user?.getIdTokenResult,
    })

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
            <div className="flex flex-row ml-80 mt-10 max-w-full px-10">
                <button
                    onClick={handleNewDeviceOpen}
                    className="m-auto text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 "
                >
                    Add new device
                </button>
                <NewDeviceModal
                    isOpen={newDeviceOpen}
                    handleClose={handleNewDeviceClosed}
                />

                {devices?.map(({ name, token }: any) => (
                    <DeviceCard key={token} name={name} token={token} />
                ))}
            </div>
        </>
    )
}

DevicePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>
}

export default DevicePage