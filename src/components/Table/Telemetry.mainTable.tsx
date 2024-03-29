import React from 'react'
import { ITelemetryData } from '../../types/telemetry'
import Pagination from './Telemetry.pagination'
import TelemetryTableBody from './Telemetry.tableBody'

interface TelemetryProps {
    telemetry: ITelemetryData
    deviceShortName: string
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Telemetry: React.FC<TelemetryProps> = ({
    telemetry,
    deviceShortName,
    page,
    setPage,
}) => {
    return (
        <div className="overflow-y-auto shadow-md sm:rounded-lg">
            <table className="w-full h-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Device Short Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Sensor Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Sensor Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Time
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {telemetry?.data?.map((value, key) => {
                        return <TelemetryTableBody {...value} key={key} />
                    })}
                </tbody>
            </table>
            {telemetry?.data?.length == 0 ? (
                <p className="text-center text-sm py-5 m-auto">
                    Telemetry data is empty
                </p>
            ) : null}
            {telemetry?.data?.length > 0 && (
                <Pagination
                    telemetry={telemetry}
                    page={page}
                    setPage={setPage}
                />
            )}
        </div>
    )
}

export default Telemetry
