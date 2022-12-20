import { useQuery } from '@tanstack/react-query'
import { IQueryTelemetry, IQueryTelemetryRealtime } from '../../types/device'
import { getTelemetryData, getTelemetryRealTime } from '../../utils/telemetry'

export function useTelemetry({ deviceShortName, page }: IQueryTelemetry) {
    return useQuery({
        queryKey: ['telemetry', deviceShortName, page],
        queryFn: () => getTelemetryData({ deviceShortName, page }),
        enabled: !!deviceShortName,
        refetchOnMount: true,
    })
}

export function useTelemetryRealTime({
    deviceShortName,
    sensors,
}: IQueryTelemetryRealtime) {
    return useQuery({
        queryKey: ['telemetry-real-time', deviceShortName],
        queryFn: () => getTelemetryRealTime({ deviceShortName, sensors }),
        enabled: deviceShortName !== undefined && sensors.length > 0,
        refetchInterval: 1000,
    })
}
