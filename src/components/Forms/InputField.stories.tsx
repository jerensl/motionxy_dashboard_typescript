import type { Meta, StoryFn } from '@storybook/react'
import { InputFieldWithError } from './InputField'
import { Formik } from 'formik'
import { NewDeviceValidationSchema } from '../../constant/validation'

const meta: Meta<typeof InputFieldWithError> = {
    title: 'components/Forms/InputField',
    component: InputFieldWithError,
}

export default meta

export const Basic: StoryFn<typeof InputFieldWithError> = () => {
    return (
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
            onSubmit={(values, actions) => {}}
            validationSchema={NewDeviceValidationSchema}
        >
            {(props) => (
                <form>
                    <InputFieldWithError
                        props={props}
                        fieldName="deviceName"
                        label="Device Name"
                        value={props.values.deviceName}
                    />
                </form>
            )}
        </Formik>
    )
}
