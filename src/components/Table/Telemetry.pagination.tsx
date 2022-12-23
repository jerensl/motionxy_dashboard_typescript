import clsx from 'clsx'
import { ITelemetryData } from '../../types/telemetry'

interface TelemetryProps {
    telemetry: ITelemetryData
    deviceShortName: string
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Page: React.FC<Omit<TelemetryProps, 'deviceShortName'>> = ({
    page: currentPage,
    telemetry,
    setPage,
}) => {
    const pages = []
    const maxPage = telemetry.totalPage

    if (currentPage > 1 && currentPage < maxPage) {
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
    } else if (currentPage === 1 && maxPage === 1) {
        pages.push(currentPage)
    } else if (currentPage === maxPage) {
        pages.push(1)
        pages.push(2)
        pages.push(3)
    } else {
        pages.push(1)
        pages.push(2)
        pages.push(3)
    }

    return (
        <ul className="inline-flex items-center -space-x-px">
            {pages.map((value, index) => {
                if (value === currentPage) {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => setPage(value)}
                                className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                            >
                                {value}
                            </button>
                        </li>
                    )
                }
                return (
                    <li key={index}>
                        <button
                            onClick={() => setPage(value)}
                            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                        >
                            {value}
                        </button>
                    </li>
                )
            })}
            {currentPage > 1 && (
                <>
                    <li>
                        <a
                            href="#"
                            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        >
                            ...
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={() => setPage(maxPage)}
                            className={clsx('py-2 px-3 leading-tight', {
                                'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700':
                                    maxPage === currentPage,
                                'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700':
                                    maxPage !== currentPage,
                            })}
                        >
                            {telemetry.totalPage}
                        </button>
                    </li>
                </>
            )}
        </ul>
    )
}

const Pagination: React.FC<Omit<TelemetryProps, 'deviceShortName'>> = ({
    telemetry,
    page,
    setPage,
}) => {
    return (
        <nav
            className="flex justify-between items-center pt-2 m-2"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                    {telemetry.page * 10 - 10 + 1}-
                    {telemetry.page * 10 - 10 + telemetry.totalData}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-gray-900">
                    {telemetry.total}
                </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
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
                    </button>
                </li>
                <Page page={page} telemetry={telemetry} setPage={setPage} />
                <li>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === telemetry.totalPage}
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
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
