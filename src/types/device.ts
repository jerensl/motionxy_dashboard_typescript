export interface ISensor {
    sensorName: string
    sensorType: string
    sensorUnit: string
}

export interface IDevice {
    deviceName: string
    deviceShortName: string | undefined
    token: string
    sensors: Array<ISensor>
}

export type IDevices = Array<Omit<IDevice, 'sensors'>>

export interface INewDevice {
    deviceName: string
    deviceShortName: string
    sensors: Array<ISensor>
}

export type IDeletedDevice = Pick<IDevice, 'deviceShortName'>

export interface IQueryTelemetryRealtime {
    deviceShortName: string | undefined
    sensors: Array<string>
}

export interface IQueryTelemetryRealtimeResponse {
    deviceName: string
    data: Array<Array<number>>
    sensors: Array<string>
}

export interface IQueryDevice {
    deviceShortName: string
}

export interface IQueryTelemetry {
    deviceShortName: string | undefined
    sensors: Array<string>
    startDate: string
    endDate: string
    page: number
}
