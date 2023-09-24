import React, { InputHTMLAttributes } from 'react'
import { ErrorMessage, FormikProps } from 'formik'
import { INewDevice, ISensor } from '../../types/device'

interface InputFieldWithErrorProps {
    props: FormikProps<INewDevice>
    label: string
    fieldName: string
    value: string
}

export const InputFieldWithError: React.FC<InputFieldWithErrorProps> = ({
    props,
    label,
    fieldName,
    value,
}) => {
    return (
        <>
            <label
                htmlFor={fieldName}
                className="text-sm font-medium text-gray-900 block"
            >
                {label}
                <span className="text-red-500">*</span>
            </label>
            <ErrorMessage
                className="text-red-500 text-xs"
                component="div"
                name={fieldName}
            />
            <input
                id={fieldName}
                name={fieldName}
                placeholder={label}
                onChange={props.handleChange}
                value={value}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </>
    )
}
