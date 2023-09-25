import type { Meta, StoryFn } from '@storybook/react'
import { InputField } from './InputField'
import { Formik } from 'formik'
import { NewDeviceValidationSchema } from '../../constant/validation'

const meta: Meta<typeof InputField> = {
    title: 'components/Forms/InputField',
    component: InputField,
}

export default meta

export const Basic: StoryFn<typeof InputField> = () => {
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
                    <InputField
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
