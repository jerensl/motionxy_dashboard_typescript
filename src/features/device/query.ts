import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../context/useAuth'
import { getDevices } from '../../utils/device'

export const useDevices = () => {
    const { user } = useAuth()
    return useQuery({
        queryKey: ['devices', user?.getIdTokenResult],
        queryFn: getDevices,
        enabled: !!user?.getIdTokenResult,
        refetchInterval: 1000,
    })
}
