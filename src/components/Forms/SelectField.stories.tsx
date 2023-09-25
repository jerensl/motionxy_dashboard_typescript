import type { Meta, StoryFn } from '@storybook/react'
import { SelectField } from './SelectField'
import { Formik } from 'formik'
import { NewDeviceValidationSchema } from '../../constant/validation'
import { sensorsType } from '../../constant/sensor'

const meta: Meta<typeof SelectField> = {
    title: 'components/Forms/SelectField',
    component: SelectField,
}

export default meta

export const Basic: StoryFn<typeof SelectField> = () => {
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
                    <SelectField
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
