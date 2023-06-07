import clsx from 'clsx'
import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { IDevice } from '../../types/device'
import DeviceDropdown from '../Dropdown/Device.dropdown'
import DeleteModal from '../Modal/ConfirmDelete.modal'
import DeviceInfoModal from '../Modal/Info.modal'

export const DeviceCard = ({
    deviceName,
    deviceShortName,
    token,
}: Omit<IDevice, 'sensors'>) => {
    const [showCopy, setShowCopy] = useState<boolean>(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true)
    }

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false)
    }

    const handleOpenInfoModal = () => {
        setIsInfoModalOpen(true)
    }

    return (
        <>
            <div
                onMouseEnter={() => setShowCopy(true)}
                onMouseLeave={() => setShowCopy(false)}
                className="col-span-full md:col-span-4 p-6 grid gap-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100"
            >
                <div className="flex flex-row justify-between">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {deviceName}
                    </h3>
                    <DeviceDropdown
                        handleOpenDeleteModal={handleOpenDeleteModal}
                        handleOpenInfoModal={handleOpenInfoModal}
                    />
                </div>
                <p className="font-normal text-sm text-gray-700">
                    <b>Short Name: </b> {deviceShortName}
                </p>
                <div className="flex">
                    <p className="font-bold text-sm text-gray-700">Token:</p>
                    <p className="font-normal text-sm ml-1">{token}</p>
                    <button
                        className={clsx(
                            'ml-1 p-1 hover:bg-slate-200 block active:bg-slate-300 active:text-green-600',
                            {
                                hidden: !showCopy,
                            }
                        )}
                        onClick={() => copy(token)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 m-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <DeleteModal
                deviceShortName={deviceShortName}
                isOpen={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
            />
            <DeviceInfoModal
                deviceShortName={deviceShortName}
                isOpen={isInfoModalOpen}
                handleClose={handleCloseInfoModal}
            />
        </>
    )
}
