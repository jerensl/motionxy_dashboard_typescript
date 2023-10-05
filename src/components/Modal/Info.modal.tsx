import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDevice } from '../../features/device/query'
import Container from './Container'

interface DeviceInfoModalProps {
    isOpen: boolean
    deviceShortName: string | undefined
    handleClose: () => void
}

export default function DeviceInfoModal({
    isOpen,
    deviceShortName,
    handleClose,
}: DeviceInfoModalProps) {
    const {
        data: device,
        isLoading: deviceIsLoading,
        isError: deviceIsError,
    } = useDevice({ deviceShortName: deviceShortName ?? '' })

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative" onClose={handleClose}>
                <Container>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl text-center mb-5 font-medium leading-6 text-gray-900"
                                    >
                                        Device Information
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-row my-4">
                                        <p className="text-base text-gray-500">
                                            Device Name:
                                        </p>
                                        <p className="text-base text-gray-500 ml-2">
                                            {device?.deviceName}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex flex-row my-4">
                                        <p className="text-base text-gray-500">
                                            Device Short Name:
                                        </p>
                                        <p className="text-base text-gray-500 ml-2">
                                            {device?.deviceShortName}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex flex-row my-4">
                                        <p className="text-base text-gray-500">
                                            Token:
                                        </p>
                                        <p className="text-base text-gray-500 ml-2">
                                            {device?.token}
                                        </p>
                                    </div>
                                    <div className="py-4">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-2"
                                                    >
                                                        No
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6"
                                                    >
                                                        Sensor Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6"
                                                    >
                                                        Sensor Type
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-6"
                                                    >
                                                        Sensor Unit
                                                    </th>
                                                </tr>
                                            </thead>
                                            {device?.sensors.map(
                                                (sensor, index) => {
                                                    return (
                                                        <tbody key={index}>
                                                            <td className="py-4 px-2">
                                                                {index + 1}
                                                            </td>
                                                            <th
                                                                scope="row"
                                                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                {
                                                                    sensor.sensorName
                                                                }
                                                            </th>
                                                            <td className="py-4 px-6">
                                                                {
                                                                    sensor.sensorType
                                                                }
                                                            </td>
                                                            <td className="py-4 px-6">
                                                                {
                                                                    sensor.sensorUnit
                                                                }
                                                            </td>
                                                        </tbody>
                                                    )
                                                }
                                            )}
                                        </table>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleClose}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Container>
            </Dialog>
        </Transition>
    )
}
