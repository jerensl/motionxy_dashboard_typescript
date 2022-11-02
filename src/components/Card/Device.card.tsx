import React from 'react'

interface DeviceCard {
    name: string
    token: string
}

export const DeviceCard = ({ name, token }: DeviceCard) => {
    return (
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
            </h3>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                <b>Token: </b> {token}
            </p>
        </div>
    )
}
