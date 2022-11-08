import React from 'react'

const Telemetry: React.FC = () => {
    return (
        <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
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
                    <tr className="bg-white border-b">
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                            Apple MacBook Pro 17
                        </th>
                        <td className="py-4 px-6">Sliver</td>
                        <td className="py-4 px-6">Laptop</td>
                        <td className="py-4 px-6">$2999</td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                            Microsoft Surface Pro
                        </th>
                        <td className="py-4 px-6">White</td>
                        <td className="py-4 px-6">Laptop PC</td>
                        <td className="py-4 px-6">$1999</td>
                    </tr>
                    <tr className="bg-white">
                        <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                            Magic Mouse 2
                        </th>
                        <td className="py-4 px-6">Black</td>
                        <td className="py-4 px-6">Accessories</td>
                        <td className="py-4 px-6">$99</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Telemetry
