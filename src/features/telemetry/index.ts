import { useQuery } from '@tanstack/react-query'
import { IQueryTelemetry, IQueryTelemetryRealtime } from '../../types/device'
import { getTelemetryData, getTelemetryRealTime } from '../../utils/telemetry'

export function useTelemetry({ deviceShortName, page }: IQueryTelemetry) {
    return useQuery({
        queryKey: ['telemetry', deviceShortName],
        queryFn: () => getTelemetryData({ deviceShortName, page }),
        enabled: !!deviceShortName,
    })
}

export function useTelemetryRealTime({
    deviceShortName,
}: IQueryTelemetryRealtime) {
    return useQuery({
        queryKey: ['telemetry-real-time', deviceShortName],
        queryFn: () => getTelemetryRealTime({ deviceShortName }),
        enabled: !!deviceShortName,
        refetchInterval: 1000,
    })
}
