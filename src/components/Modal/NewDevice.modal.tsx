import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, FieldArray, Formik, FormikProps } from 'formik'
import { Fragment } from 'react'
import { useAddDevice } from '../../features/device/query'
import * as Yup from 'yup'
import { INewDevice } from '../../types/device'

interface SuccessModalProps {
    isOpen: boolean
    handleClose: () => void
}

const NewDeviceValidationSchema = Yup.object().shape({
    deviceName: Yup.string()
        .required('Device name is required')
        .min(3, 'Device name is too short - should be 3 chars minimum.')
        .max(50, 'Device name is too long - should be 50 chars maximum.'),
    deviceShortName: Yup.string()
        .trim()
        .min(3, 'Device short name is too short - should be 3 chars minimum.')
        .max(25, 'Device short name  is too long - should be 25 chars maximum.')
        .required('Device short name  Required'),
    sensors: Yup.array().of(
        Yup.object().shape({
            sensorName: Yup.string()
                .required('Sensor name is required')
                .min(3, 'Sensor name is too short - should be 3 chars minimum.')
                .max(
                    50,
                    'Sensor name is too long - should be 50 chars maximum.'
                ),
            sensorType: Yup.string().required('Sensor type is required'),
            sensorUnit: Yup.string().required('Sensor unit is required'),
        })
    ),
})

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
                                        await mutation.mutate({
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
                                                <label
                                                    htmlFor="deviceName"
                                                    className="text-sm font-medium text-gray-900 block "
                                                >
                                                    Device Name
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                {props.errors.deviceName &&
                                                props.touched.deviceName ? (
                                                    <span className="text-xs text-red-500">
                                                        {
                                                            props.errors
                                                                .deviceName
                                                        }
                                                    </span>
                                                ) : null}
                                                <input
                                                    id="deviceName"
                                                    name="deviceName"
                                                    placeholder="Device Name"
                                                    onChange={
                                                        props.handleChange
                                                    }
                                                    value={
                                                        props.values.deviceName
                                                    }
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
                                                {props.errors.deviceShortName &&
                                                props.touched
                                                    .deviceShortName ? (
                                                    <span className="text-xs text-red-500">
                                                        {
                                                            props.errors
                                                                .deviceShortName
                                                        }
                                                    </span>
                                                ) : null}
                                                <input
                                                    id="deviceShortName"
                                                    name="deviceShortName"
                                                    placeholder="Device Short Name"
                                                    onChange={
                                                        props.handleChange
                                                    }
                                                    value={
                                                        props.values
                                                            .deviceShortName
                                                    }
                                                    className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    <label
                                        htmlFor={`sensors.${idx}.sensorName`}
                                        className="text-sm font-medium text-gray-900 block "
                                    >
                                        Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        className="text-red-500 text-xs"
                                        component="div"
                                        name={`sensors.${idx}.sensorName`}
                                    />
                                    <input
                                        id={`sensors.${idx}.sensorName`}
                                        name={`sensors.${idx}.sensorName`}
                                        placeholder="Sensor Name"
                                        onChange={props.handleChange}
                                        value={
                                            props.values.sensors[idx].sensorName
                                        }
                                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor={`sensors.${idx}.sensorType`}
                                        className="text-sm font-medium text-gray-900 block "
                                    >
                                        Type
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        className="text-red-500 text-xs"
                                        component="div"
                                        name={`sensors.${idx}.sensorType`}
                                    />
                                    <select
                                        name={`sensors.${idx}.sensorType`}
                                        onChange={props.handleChange}
                                        value={
                                            props.values.sensors[idx].sensorType
                                        }
                                        onBlur={props.handleBlur}
                                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="" label="Select a Type">
                                            Select a Type{' '}
                                        </option>
                                        <option
                                            value="temperature"
                                            label="Temperature"
                                        >
                                            Temperature
                                        </option>
                                        <option value="energy" label="Energy">
                                            Energy
                                        </option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor={`sensors.${idx}.sensorUnit`}
                                        className="text-sm font-medium text-gray-900 block "
                                    >
                                        Unit
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <ErrorMessage
                                        className="text-red-500 text-xs"
                                        component="div"
                                        name={`sensors.${idx}.sensorUnit`}
                                    />
                                    <select
                                        name={`sensors.${idx}.sensorUnit`}
                                        onChange={props.handleChange}
                                        value={
                                            props.values.sensors[idx].sensorUnit
                                        }
                                        onBlur={props.handleBlur}
                                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="" label="Select a Unit">
                                            Select a Unit{' '}
                                        </option>
                                        <option value="celsius" label="Celsius">
                                            Celsius
                                        </option>
                                        <option value="volt" label="Volt">
                                            Volt
                                        </option>
                                        <option value="ampere" label="Ampere">
                                            Ampere
                                        </option>
                                    </select>
                                </div>
                                <div className="col">
                                    <button
                                        type="button"
                                        className="secondary w-full pt-6 h-full m-auto"
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
                        className="secondary"
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
