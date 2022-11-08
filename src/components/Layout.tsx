import React from 'react'
import { useAuth } from '../context/useAuth'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export default function Layout({ children }: { children: React.ReactChild }) {
    const { user, isLoading } = useAuth()

    if (!user || isLoading) {
        return <p>loading</p>
    }

    return (
        <div className="h-screen">
            <Navbar />
            <Sidebar />
            <main className="h-full">{children}</main>
        </div>
    )
}
