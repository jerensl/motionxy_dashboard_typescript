import dayjs from 'dayjs'
import { IData } from '../../types/telemetry'

interface TableBodyProps extends IData {
    deviceShortName: string | undefined
}

const TelemetryTableBody = (
    {
        deviceShortName,
        timestamp,
        value1,
        value2,
        value3,
        value4,
    }: TableBodyProps,
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
            <td className="py-4 px-6">{date.format('HH:mm.ss A')}</td>
            <td className="py-4 px-6">{date.format('DD/MM/YYYY')}</td>
            <td className="py-4 px-6">{value1}</td>
            <td className="py-4 px-6">{value2}</td>
            <td className="py-4 px-6">{value3}</td>
            <td className="py-4 px-6">{value4}</td>
        </tr>
    )
}

export default TelemetryTableBody
