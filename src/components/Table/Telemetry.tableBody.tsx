import dayjs from 'dayjs'
import { IData } from '../../types/telemetry'

interface TableBodyProps extends IData {
    deviceShortName: string | undefined
}

const TelemetryTableBody = (
    { deviceShortName, deviceName, timestamp, value }: TableBodyProps,
    index: number
) => {
    const date = dayjs(timestamp)
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
            >
                {deviceShortName}
            </th>
            <td className="py-4 px-6">{deviceName}</td>
            <td className="py-4 px-6">{date.format('HH:mm.ss A')}</td>
            <td className="py-4 px-6">{date.format('DD/MM/YYYY')}</td>
            <td className="py-4 px-6">{value}</td>
        </tr>
    )
}

export default TelemetryTableBody
