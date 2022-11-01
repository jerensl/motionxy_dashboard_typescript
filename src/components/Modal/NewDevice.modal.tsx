import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import { Fragment } from 'react'
import { createNewDevice } from '../../utils/device'

interface NewDeviceValues {
    name: string
}

interface SuccessModalProps {
    isOpen: boolean
    handleClose: () => void
}

export default function NewDeviceModal({
    isOpen,
    handleClose,
}: SuccessModalProps) {
    const formik = useFormik<NewDeviceValues>({
        initialValues: {
            name: '',
        },
        onSubmit: async (values, action) => {
            await createNewDevice(values.name)
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
                                            htmlFor="name"
                                            className="text-sm font-medium text-gray-900 block "
                                        >
                                            Device Name
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        {formik.errors.name &&
                                        formik.touched.name ? (
                                            <span className="text-xs text-red-500">
                                                {formik.errors.name}
                                            </span>
                                        ) : null}
                                        <input
                                            id="name"
                                            name="name"
                                            placeholder="Device Name"
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
