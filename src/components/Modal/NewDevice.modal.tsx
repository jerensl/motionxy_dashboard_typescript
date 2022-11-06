import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import { Fragment } from 'react'
import { useAddDevice } from '../../features/device/query'

interface NewDeviceValues {
    deviceName: string
    deviceShortName: string
}

interface SuccessModalProps {
    isOpen: boolean
    handleClose: () => void
}

export default function NewDeviceModal({
    isOpen,
    handleClose,
}: SuccessModalProps) {
    const mutation = useAddDevice()

    const formik = useFormik<NewDeviceValues>({
        initialValues: {
            deviceName: '',
            deviceShortName: '',
        },
        onSubmit: async (values, { resetForm }) => {
            await mutation.mutate({
                deviceName: values.deviceName,
                deviceShortName: values.deviceShortName,
            })
            handleClose()
            resetForm()
        },
    })

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    New Device
                                </Dialog.Title>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="mt-4 space-y-6 flex flex-col"
                                >
                                    <div>
                                        <label
                                            htmlFor="deviceName"
                                            className="text-sm font-medium text-gray-900 block "
                                        >
                                            Device Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        {formik.errors.deviceName &&
                                        formik.touched.deviceName ? (
                                            <span className="text-xs text-red-500">
                                                {formik.errors.deviceName}
                                            </span>
                                        ) : null}
                                        <input
                                            id="deviceName"
                                            name="deviceName"
                                            placeholder="Device Name"
                                            onChange={formik.handleChange}
                                            value={formik.values.deviceName}
                                            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="deviceShortName"
                                            className="text-sm font-medium text-gray-900 block "
                                        >
                                            Device Short Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        {formik.errors.deviceShortName &&
                                        formik.touched.deviceShortName ? (
                                            <span className="text-xs text-red-500">
                                                {formik.errors.deviceShortName}
                                            </span>
                                        ) : null}
                                        <input
                                            id="deviceShortName"
                                            name="deviceShortName"
                                            placeholder="Device Short Name"
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.deviceShortName
                                            }
                                            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <button
                                        disabled={
                                            !formik.isValidating &&
                                            formik.isSubmitting
                                        }
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
