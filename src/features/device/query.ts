import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/useAuth'
import { getDevices, createNewDevice } from '../../utils/device'

export const queryClient = new QueryClient()

export const useDevices = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['devices'],
        queryFn: getDevices,
        enabled: !!user?.getIdTokenResult,
        staleTime: 1000,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
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
