import type { Meta, StoryFn } from '@storybook/react'
import { SelectFieldWithError } from './SelectField'
import { Formik } from 'formik'
import { NewDeviceValidationSchema } from '../../constant/validation'
import { sensorsType } from '../../constant/sensor'

const meta: Meta<typeof SelectFieldWithError> = {
    title: 'components/Forms/SelectField',
    component: SelectFieldWithError,
}

export default meta

export const Basic: StoryFn<typeof SelectFieldWithError> = () => {
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
                    <SelectFieldWithError
                        idx={0}
                        props={props}
                        label="Type"
                        fieldName="sensorType"
                        options={sensorsType}
                    />
                </form>
            )}
        </Formik>
    )
}
