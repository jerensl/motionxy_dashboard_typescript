import { IDevice } from './device'

export interface IData {
    timestamp: string
    value1: number
    value2: number
    value3: number
    value4: number
}

export interface ITelemetryData {
    page: number
    totalPage: number
    data: Array<IData>
}

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
