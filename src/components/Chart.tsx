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

interface ChartProps {
    deviceName: string
    sensors: Array<string>
    data: Array<Array<number>>
    timestamps: Array<string>
}

const Chart: React.FC<ChartProps> = ({
    deviceName,
    sensors,
    data,
    timestamps,
}) => {
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
                labels: timestamps,
                datasets: dataset,
            }}
        />
    )
}

export default Chart
