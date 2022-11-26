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

interface ChartProps {
    name: string
    data: number[]
}

const Chart: React.FC<ChartProps> = ({ name, data }) => {
    return (
        <Line
            options={{
                responsive: true,
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                        loop: (context) => context.active,
                    },
                },
                scales: {
                    y: {
                        min: 0,
                    },
                },
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: name,
                    },
                },
            }}
            data={{
                labels,
                datasets: [
                    {
                        label: 'Sensor',
                        data: data,
                        cubicInterpolationMode: 'monotone',
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            }}
        />
    )
}

export default Chart
