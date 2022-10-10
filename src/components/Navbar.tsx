import React from 'react'
import { Profile } from './Profile'

export const Navbar: React.FC = () => {
    return (
        <nav className="w-full flex relative justify-between items-center mx-auto px-8 h-20">
            <div>
                <h1>Logo</h1>
            </div>
            <div className="block">
                <div className="inline relative">
                    <Profile />
                </div>
            </div>
        </nav>
    )
}
