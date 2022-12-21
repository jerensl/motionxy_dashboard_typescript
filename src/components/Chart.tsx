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
    ChartData,
    ChartDataset,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { randomColors } from '../utils/random'

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
    deviceName: string
    sensors: Array<string>
    data: Array<Array<number>>
}

const Chart: React.FC<ChartProps> = ({ deviceName, sensors, data }) => {
    const dataset = data.map(
        (data, idx) =>
            ({
                id: idx,
                label: sensors[idx],
                data: data,
                cubicInterpolationMode: 'monotone',
                borderColor: randomColors[idx % randomColors.length],
                backgroundColor: randomColors[idx % randomColors.length],
            } as ChartDataset<'line', number[]>)
    )

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
                        text: deviceName,
                    },
                },
            }}
            data={{
                labels,
                datasets: dataset,
            }}
        />
    )
}

export default Chart
