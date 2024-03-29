import React from 'react'
import { Profile } from './Profile'

export const Navbar: React.FC = () => {
    return (
        <nav className="w-full top-0 sticky bg-white flex justify-between items-center mx-auto px-8 h-16 border-b-2 shadow-sm">
            <div>
                <h1 className="font-bold text-lg">MotionXY</h1>
            </div>
            <div className="block">
                <div className="inline relative">
                    <Profile />
                </div>
            </div>
        </nav>
    )
}
