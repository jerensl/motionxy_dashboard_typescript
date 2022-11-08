import { useQuery } from '@tanstack/react-query'
import { IQueryTelemetry } from '../../types/device'
import { getTelemetryData } from '../../utils/telemetry'

export function useTelemetry({ deviceShortName }: IQueryTelemetry) {
    return useQuery({
        queryKey: ['telemetry', deviceShortName],
        queryFn: () => getTelemetryData({ deviceShortName }),
        enabled: !!deviceShortName,
    })
}
