import { ISelectSensorType } from '../types/device'

export const sensorsType: Array<ISelectSensorType> = [
    {
        label: 'Select a type',
        value: '',
    },
    {
        label: 'Temperature',
        value: 'temperature',
    },
    {
        label: 'Energy',
        value: 'energy',
    },
]

export const sensorsUnit: Record<string, Array<ISelectSensorType>> = {
    '': [
        {
            value: '',
            label: 'Select a Unit',
        },
    ],
    temperature: [
        {
            value: '',
            label: 'Select a Unit',
        },
        {
            value: 'celsius',
            label: 'Celsius',
        },
    ],
    energy: [
        {
            value: '',
            label: 'Select a Unit',
        },
        {
            value: 'volt',
            label: 'Volt',
        },
        {
            value: 'current',
            label: 'Current',
        },
    ],
}
