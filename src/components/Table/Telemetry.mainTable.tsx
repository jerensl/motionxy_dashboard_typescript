import React from 'react'
import { ITelemetryData } from '../../types/telemetry'

interface TelemetryProps {
    telemetry: Array<ITelemetryData> | undefined
    deviceShortName: string | undefined
}

const Telemetry: React.FC<TelemetryProps> = ({
    telemetry,
    deviceShortName,
}) => {
    return (
        <div className="overflow-y-auto">
            <table className="w-full h-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Device short name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Timestamp
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value 2
                        </th>

                        <th scope="col" className="py-3 px-6">
                            Value 3
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value 4
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {telemetry?.map((value, key) => {
                        return (
                            <TableBody
                                deviceShortName={deviceShortName}
                                {...value}
                                key={key}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

interface TableBodyProps extends ITelemetryData {
    deviceShortName: string | undefined
}

function TableBody(
    {
        deviceShortName,
        timestamp,
        value1,
        value2,
        value3,
        value4,
    }: TableBodyProps,
    index: number
) {
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
            >
                {deviceShortName}
            </th>
            <td className="py-4 px-6">{timestamp}</td>
            <td className="py-4 px-6">{value1}</td>
            <td className="py-4 px-6">{value2}</td>
            <td className="py-4 px-6">{value3}</td>
            <td className="py-4 px-6">{value4}</td>
        </tr>
    )
}

export default Telemetry
