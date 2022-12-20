import { IDevice } from './device'

export interface IData {
    deviceName: string
    data: Array<Array<number>>
    sensors: Array<string>
}

export interface ITelemetryData {
    page: number
    totalPage: number
    total: number
    totalData: number
    data: Array<IData>
}

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
