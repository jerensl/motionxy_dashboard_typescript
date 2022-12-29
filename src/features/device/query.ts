import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/useAuth'
import { IDevice, IDevices, IQueryDevice } from '../../types/device'
import {
    getDevices,
    createNewDevice,
    deleteDevice,
    getDevice,
} from '../../utils/device'

export const queryClient = new QueryClient()

export const useDevices = () => {
    const { user } = useAuth()

    return useQuery<IDevices, Error>({
        queryKey: ['devices'],
        queryFn: getDevices,
        enabled: !!user?.getIdTokenResult,
    })
}

export const useDevice = ({ deviceShortName }: IQueryDevice) => {
    const { user } = useAuth()

    return useQuery<IDevice, Error>({
        queryKey: ['device', deviceShortName],
        queryFn: () => getDevice({ deviceShortName }),
        enabled: !!user?.getIdTokenResult && !!deviceShortName,
    })
}

export const useAddDevice = () => {
    return useMutation({
        mutationFn: createNewDevice,
        onMutate: async (newDevice) => {
            // Cancel current queries for the device list
            await queryClient.cancelQueries({
                queryKey: ['devices'],
            })

            // Snapshot the previous value
            const previousDevices = queryClient.getQueryData(['devices'])

            // Add optimistic device to devices list
            queryClient.setQueryData(['devices'], (old: any) => [
                ...old,
                newDevice,
            ])

            // Return context with the optimistic todo
            return { previousDevices }
        },
        onError: (err, newDevice, context) => {
            queryClient.setQueryData(['devices'], context?.previousDevices)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['devices'],
            })
        },
    })
}

export const useDeleteDevice = () => {
    return useMutation({
        mutationFn: deleteDevice,
        onMutate: async (newDevice) => {
            // Cancel current queries for the device list
            await queryClient.cancelQueries({
                queryKey: ['devices'],
            })

            // Snapshot the previous value
            const previousDevices = queryClient.getQueryData(['devices'])

            // Add optimistic device to devices list
            queryClient.setQueryData(['devices'], (old: any) =>
                old.filter(
                    (device: any) =>
                        device.shortName != newDevice.deviceShortName
                )
            )

            // Return context with the optimistic todo
            return { previousDevices }
        },
        onError: (err, newDevice, context) => {
            queryClient.setQueryData(['devices'], context?.previousDevices)
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['devices'],
            })
        },
    })
}
