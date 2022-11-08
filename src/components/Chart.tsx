import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Temperature',
        },
    },
}

const labels = [
    '9 Second ago',
    '8 Second ago',
    '7 Second ago',
    '6 Second ago',
    '5 Second ago',
    '4 Second ago',
    '3 Second ago',
    '2 Second ago',
    '1 Second ago',
    'Now',
]

const Chart: React.FC<{ value1: number[] }> = ({ value1 }) => {
    return (
        <Line
            options={options}
            data={{
                labels,
                datasets: [
                    {
                        label: 'Sensor 1',
                        data: value1,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            }}
        />
    )
}

export default Chart
