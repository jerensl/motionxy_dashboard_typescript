import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export default function Layout({ children }: { children: React.ReactChild }) {
    return (
        <>
            <Navbar />
            <Sidebar />
            <main>{children}</main>
        </>
    )
}
