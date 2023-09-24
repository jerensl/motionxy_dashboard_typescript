import React from 'react'
import { ErrorMessage, FormikProps } from 'formik'
import { INewDevice, ISensor } from '../../types/device'

interface ISelectSensorType {
    value: string
    label: string
}

interface SelectFieldWithErrorProps {
    idx: number
    props: FormikProps<INewDevice>
    label: string
    fieldName: keyof ISensor
    options: Array<ISelectSensorType>
}

export const SelectFieldWithError: React.FC<SelectFieldWithErrorProps> = ({
    idx,
    props,
    label,
    fieldName,
    options,
}) => {
    return (
        <div className="col">
            <label
                htmlFor={`sensors.${idx}.${fieldName}`}
                className="text-sm font-medium text-gray-900 block "
            >
                {label}
                <span className="text-red-500">*</span>
            </label>
            <ErrorMessage
                className="text-red-500 text-xs"
                component="div"
                name={`sensors.${idx}.${fieldName}`}
            />
            <select
                name={`sensors.${idx}.${fieldName}`}
                onChange={props.handleChange}
                value={props.values.sensors[idx][fieldName]}
                onBlur={props.handleBlur}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                {options.map(({ value, label }: any, index: number) => {
                    return (
                        <option key={index} value={value} label={label}>
                            {label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

interface SelectDependendFieldWithErrorProps {
    idx: number
    props: FormikProps<INewDevice>
    label: string
    fieldName: keyof ISensor
    options: Record<string, Array<ISelectSensorType>>
}

export const SelectDependendFieldWithError: React.FC<
    SelectDependendFieldWithErrorProps
> = ({ idx, props, label, fieldName, options }) => {
    return (
        <div className="col">
            <label
                htmlFor={`sensors.${idx}.${fieldName}`}
                className="text-sm font-medium text-gray-900 block "
            >
                {label}
                <span className="text-red-500">*</span>
            </label>
            <ErrorMessage
                className="text-red-500 text-xs"
                component="div"
                name={`sensors.${idx}.${fieldName}`}
            />
            <select
                name={`sensors.${idx}.${fieldName}`}
                onChange={props.handleChange}
                value={props.values.sensors[idx][fieldName]}
                onBlur={props.handleBlur}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                {options[props.values.sensors[idx].sensorType]?.map(
                    ({ value, label }: any, index: number) => {
                        return (
                            <option key={index} value={value} label={label}>
                                {label}
                            </option>
                        )
                    }
                )}
            </select>
        </div>
    )
}
