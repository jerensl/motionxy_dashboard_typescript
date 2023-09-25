import { Dialog, Transition } from '@headlessui/react'
import { FieldArray, Formik, FormikProps } from 'formik'
import { Fragment } from 'react'
import { useAddDevice } from '../../features/device/query'
import { INewDevice } from '../../types/device'
import clsx from 'clsx'
import { InputField } from '../Forms/InputField'
import {
    SelectField,
    SelectDependendFieldWithError,
} from '../Forms/SelectField'
import { sensorsType, sensorsUnit } from '../../constant/sensor'
import { NewDeviceValidationSchema } from '../../constant/validation'

interface SuccessModalProps {
    isOpen: boolean
    handleClose: () => void
}

export const NewDeviceModal = ({ isOpen, handleClose }: SuccessModalProps) => {
    const mutation = useAddDevice()

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    New Device
                                </Dialog.Title>
                                <Formik
                                    initialValues={{
                                        deviceName: '',
                                        deviceShortName: '',
                                        sensors: [
                                            {
                                                sensorName: '',
                                                sensorType: '',
                                                sensorUnit: '',
                                            },
                                        ],
                                    }}
                                    validationSchema={NewDeviceValidationSchema}
                                    onSubmit={async (values, { resetForm }) => {
                                        const deviceShortName =
                                            values.deviceShortName
                                                .trim()
                                                .replace(/ /g, '')
                                        mutation.mutate({
                                            deviceName: values.deviceName,
                                            deviceShortName: deviceShortName,
                                            sensors: values.sensors,
                                        })

                                        handleClose()
                                        resetForm()
                                    }}
                                >
                                    {(props) => (
                                        <form
                                            onSubmit={props.handleSubmit}
                                            className="mt-4 space-y-6 flex flex-col"
                                        >
                                            <div>
                                                <InputField
                                                    props={props}
                                                    label="Device Name"
                                                    fieldName="deviceName"
                                                    value={
                                                        props.values.deviceName
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    props={props}
                                                    label="Device Short Name"
                                                    fieldName="deviceShortName"
                                                    value={
                                                        props.values
                                                            .deviceShortName
                                                    }
                                                />
                                            </div>
                                            <Sensors props={props} />
                                            <button
                                                disabled={
                                                    !props.isValidating &&
                                                    props.isSubmitting
                                                }
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

const Sensors = ({ props }: { props: FormikProps<INewDevice> }) => {
    return (
        <FieldArray name="sensors">
            {({ insert, remove, push }) => (
                <div>
                    {props.values.sensors.length > 0 &&
                        props.values.sensors.map((sensor, idx) => (
                            <div className="flex flex-row gap-2 mb-2" key={idx}>
                                <p className="m-auto pt-6">{idx + 1}.</p>
                                <div className="col">
                                    <InputField
                                        props={props}
                                        label="Sensor Name"
                                        fieldName={`sensors.${idx}.sensorName`}
                                        value={
                                            props.values.sensors[idx].sensorName
                                        }
                                    />
                                </div>
                                <SelectField
                                    idx={idx}
                                    props={props}
                                    label="Type"
                                    fieldName="sensorType"
                                    options={sensorsType}
                                />
                                <SelectDependendFieldWithError
                                    idx={idx}
                                    props={props}
                                    label="Unit"
                                    fieldName="sensorUnit"
                                    options={sensorsUnit}
                                />

                                <div className="col">
                                    <button
                                        type="button"
                                        disabled={idx === 0}
                                        className={clsx(
                                            'secondary w-full pt-6 h-full m-auto',
                                            {
                                                'text-gray-200': idx === 0,
                                            }
                                        )}
                                        onClick={() => remove(idx)}
                                    >
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
                                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    <button
                        type="button"
                        className="secondary m-auto flex-grow"
                        onClick={() =>
                            push({
                                sensorName: '',
                                sensorType: '',
                                sensorUnit: '',
                            })
                        }
                    >
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
                    </button>
                </div>
            )}
        </FieldArray>
    )
}

export default NewDeviceModal
