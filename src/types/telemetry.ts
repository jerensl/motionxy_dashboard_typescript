import { IDevice } from './device'

export interface IRealtimeData {
    deviceName: string
    data: Array<Array<number>>
    sensors: Array<string>
    timestamps: Array<string>
}

export interface IData {
    deviceName: string
    sensorName: string
    sensorType: string
    timestamp: string
    value: string
    unit: string
}

export interface ITelemetryData {
    page: number
    totalPage: number
    total: number
    totalData: number
    data: Array<IData>
}

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
