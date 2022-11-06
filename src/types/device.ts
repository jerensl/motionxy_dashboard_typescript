export interface IDevice {
    deviceName: string
    deviceShortName: string
    token: string
}

export type INewDevice = Omit<IDevice, 'token'>

export type IDeletedDevice = Pick<IDevice, 'deviceShortName'>
