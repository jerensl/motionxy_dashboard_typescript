import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/useAuth'
import { getDevices, createNewDevice } from '../../utils/device'

export const queryClient = new QueryClient()

export const useDevices = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['devices', user?.getIdTokenResult],
        queryFn: getDevices,
        enabled: !!user?.getIdTokenResult,
        refetchInterval: 60 * 1000,
    })
}

export const useAddDevice = () => {
    const { user } = useAuth()

    return useMutation({
        mutationFn: createNewDevice,
        onMutate: async (newDevice) => {
            // Cancel current queries for the todos list
            await queryClient.cancelQueries({
                queryKey: ['devices', user?.getIdTokenResult],
            })

            // Snapshot the previous value
            const previousDevices = queryClient.getQueryData([
                'devices',
                user?.getIdTokenResult,
            ])

            // Add optimistic todo to todos list
            queryClient.setQueryData(
                ['devices', user?.getIdTokenResult],
                (old: any) => [...old, newDevice]
            )

            // Return context with the optimistic todo
            return { previousDevices }
        },
        onError: (err, newDevice, context) => {
            queryClient.setQueryData(
                ['devices', user?.getIdTokenResult],
                context?.previousDevices
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['devices', user?.getIdTokenResult],
            })
        },
    })
}
