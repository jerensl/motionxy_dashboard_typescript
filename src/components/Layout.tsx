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
        <>
            <Navbar />
            <Sidebar />
            <main>{children}</main>
        </>
    )
}
