import { IDevice } from './device'

export interface IData {
    timestamp: string
    deviceName: string
    sensorName: string
    value: number
}

export interface ITelemetryData {
    page: number
    totalPage: number
    total: number
    totalData: number
    data: Array<IData>
}

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
