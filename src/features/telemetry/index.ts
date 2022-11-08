import { useQuery } from '@tanstack/react-query'
import { IQueryTelemetry } from '../../types/device'
import { getTelemetryData, getTelemetryRealTime } from '../../utils/telemetry'

export function useTelemetry({ deviceShortName }: IQueryTelemetry) {
    return useQuery({
        queryKey: ['telemetry', deviceShortName],
        queryFn: () => getTelemetryData({ deviceShortName }),
        enabled: !!deviceShortName,
    })
}

export function useTelemetryRealTime({ deviceShortName }: IQueryTelemetry) {
    return useQuery({
        queryKey: ['telemetry-real-time', deviceShortName],
        queryFn: () => getTelemetryRealTime({ deviceShortName }),
        enabled: !!deviceShortName,
        refetchInterval: 1000,
    })
}
