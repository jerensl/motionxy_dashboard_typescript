import React, { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import clsx from 'clsx'

export default function Layout({ children }: { children: React.ReactChild }) {
    const { user, isLoading } = useAuth()
    const [isMinimizeSidebar, setMinimizeSidebar] = useState<boolean>(true)

    if (!user || isLoading) {
        return <p>loading</p>
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <Sidebar
                isMinimize={isMinimizeSidebar}
                setMinimize={() => setMinimizeSidebar(!isMinimizeSidebar)}
            />
            <main
                className={clsx('h-full pl-80', {
                    'pl-32': isMinimizeSidebar,
                })}
            >
                {children}
            </main>
        </div>
    )
}
