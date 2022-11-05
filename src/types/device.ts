export interface IDevice {
    name: string
    shortName: string
    token: string
}

export type INewDevice = Omit<IDevice, 'token'>

export type IDeletedDevice = Pick<IDevice, 'shortName'>
