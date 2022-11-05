import React from 'react'
import DeviceDropdown from '../Dropdown/Device.dropdown'

interface DeviceCard {
    deviceName: string
    shortName: string
    token: string
}

export const DeviceCard = ({ deviceName, shortName, token }: DeviceCard) => {
    return (
        <div className="p-6 grid gap-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100">
            <div className="flex flex-row justify-between">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {deviceName}
                </h3>
                <DeviceDropdown />
            </div>
            <p className="font-normal text-sm text-gray-700">
                <b>Short Name: </b> {shortName}
            </p>
            <p className="font-normal text-sm text-gray-700">
                <b>Token: </b> {token}
            </p>
        </div>
    )
}
