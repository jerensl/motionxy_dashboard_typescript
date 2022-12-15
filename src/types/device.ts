export interface IDevice {
    deviceName: string
    deviceShortName: string | undefined
    token: string
}

export interface INewDevice {
    deviceName: string
    deviceShortName: string
    sensors: Array<ISensor>
}

export interface ISensor {
    sensorName: string
    sensorType: string
    sensorUnit: string
}

export type IDeletedDevice = Pick<IDevice, 'deviceShortName'>

export type IQueryTelemetryRealtime = Pick<IDevice, 'deviceShortName'>

export interface IQueryTelemetry {
    deviceShortName: string | undefined
    page: number
}
