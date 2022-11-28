import dayjs from 'dayjs'
import React from 'react'
import { IData, ITelemetryData } from '../../types/telemetry'

interface TelemetryProps {
    telemetry: ITelemetryData | undefined
    deviceShortName: string | undefined
}

const Telemetry: React.FC<TelemetryProps> = ({
    telemetry,
    deviceShortName,
}) => {
    return (
        <div className="overflow-y-auto shadow-md sm:rounded-lg">
            <table className="w-full h-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Device short name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Time
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Value 1
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
                    {telemetry?.data.map((value, key) => {
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
            {telemetry?.data.length == 0 ? (
                <p className="text-center text-sm py-5 m-auto">
                    Telemetry data is empty
                </p>
            ) : null}
            <Pagination telemetry={telemetry} />
        </div>
    )
}

interface TableBodyProps extends IData {
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

const Pagination: React.FC<Pick<TelemetryProps, 'telemetry'>> = ({
    telemetry,
}) => {
    return (
        <nav
            className="flex justify-between items-center pt-4"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-900">1-10</span> of{' '}
                <span className="font-semibold text-gray-900">
                    {telemetry?.totalAllData}
                </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        aria-current="page"
                        className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                    >
                        1
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                        2
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                        3
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                        ...
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                        {telemetry?.totalPage}
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Telemetry
