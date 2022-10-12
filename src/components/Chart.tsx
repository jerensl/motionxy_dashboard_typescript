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
    '10 Minutes',
    '9 Minutes',
    '8 Minutes',
    '7 Minutes',
    '6 Minutes',
    '5 Minutes',
    '4 Minutes',
    '3 Minutes',
    '2 Minutes',
    '1 Minutes',
    'Now',
]

function randomNumber(max: number) {
    return Math.round(Math.random() * max)
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Sensor 1',
            data: labels.map(() => randomNumber(30)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Sensor 2',
            data: labels.map(() => randomNumber(30)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
}

export const Chart = () => {
    return <Line options={options} data={data} />
}
