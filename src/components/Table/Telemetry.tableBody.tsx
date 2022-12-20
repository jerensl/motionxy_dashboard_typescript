import dayjs from 'dayjs'
import { IData } from '../../types/telemetry'

const TelemetryTableBody = (
    { deviceName, sensorName, timestamp, value }: IData,
    index: number
) => {
    const date = dayjs(timestamp)
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
            >
                {deviceName}
            </th>
            <td className="py-4 px-6">{sensorName}</td>
            <td className="py-4 px-6">{date.format('HH:mm.ss A')}</td>
            <td className="py-4 px-6">{date.format('DD/MM/YYYY')}</td>
            <td className="py-4 px-6">{value}</td>
        </tr>
    )
}

export default TelemetryTableBody
