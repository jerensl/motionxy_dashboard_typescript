import React from 'react'
import { Profile } from './Profile'

export const Navbar: React.FC = () => {
    return (
        <nav className="w-full top-0 sticky flex justify-between items-center mx-auto px-8 h-20 border-b-2 shadow-md">
            <div>
                <h1 className="font-bold text-lg">CEC</h1>
            </div>
            <div className="block">
                <div className="inline relative">
                    <Profile />
                </div>
            </div>
        </nav>
    )
}