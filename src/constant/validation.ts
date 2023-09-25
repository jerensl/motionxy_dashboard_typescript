import * as Yup from 'yup'

export const NewDeviceValidationSchema = Yup.object().shape({
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
