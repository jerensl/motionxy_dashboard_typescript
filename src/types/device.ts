export interface IDevice {
    deviceName: string
    deviceShortName: string | undefined
    token: string
}

export type INewDevice = Omit<IDevice, 'token'>

export type IDeletedDevice = Pick<IDevice, 'deviceShortName'>

export type IQueryTelemetry = Pick<IDevice, 'deviceShortName'>
