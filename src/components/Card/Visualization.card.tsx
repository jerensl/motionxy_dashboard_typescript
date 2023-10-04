import React, { ReactNode } from 'react'
import { Rnd } from 'react-rnd'

interface VisualizationCardProps {
    title: ReactNode
    children: ReactNode
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
    title,
    children,
}) => {
    return (
        <Rnd
            bounds="parent"
            minHeight="350px"
            minWidth="500px"
            className="bg-white p-3 border-slate-200 border rounded-lg shadow"
        >
            <div className="flex flex-row justify-between">{title}</div>
            <div>{children}</div>
        </Rnd>
    )
}
