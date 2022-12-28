import { useQuery } from '@tanstack/react-query'
import { getStats } from '../../utils/stats'

export function useStats() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: () => getStats(),
        refetchOnMount: false,
    })
}
