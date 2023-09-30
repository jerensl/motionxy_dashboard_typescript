import { useQuery } from '@tanstack/react-query'
import { IQueryTelemetry, IQueryTelemetryRealtime } from '../../types/device'
import { getTelemetryData, getTelemetryRealTime } from '../../utils/telemetry'

export function useTelemetry({
    deviceShortName,
    page,
    startDate,
    endDate,
    sensors,
}: IQueryTelemetry) {
    return useQuery({
        queryKey: [
            'telemetry',
            deviceShortName,
            page,
            startDate,
            endDate,
            sensors,
        ],
        queryFn: () =>
            getTelemetryData({
                deviceShortName,
                sensors,
                startDate,
                endDate,
                page,
            }),
        enabled: deviceShortName !== undefined,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })
}

export function useTelemetryRealTime({
    deviceShortName,
    sensors,
}: IQueryTelemetryRealtime) {
    return useQuery({
        queryKey: ['telemetry-real-time', deviceShortName],
        queryFn: () => getTelemetryRealTime({ deviceShortName, sensors }),
        enabled: !!deviceShortName && !!(sensors.length > 0),
        refetchInterval: 1000,
    })
}
