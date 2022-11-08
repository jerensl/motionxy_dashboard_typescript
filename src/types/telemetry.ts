import { IDevice } from './device'

export interface ITelemetryData {
    timestamp: string
    value1: number
    value2: number
    value3: number
    value4: number
}

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
