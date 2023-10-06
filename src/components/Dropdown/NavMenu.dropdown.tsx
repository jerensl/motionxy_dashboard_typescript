import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { signOut } from 'firebase/auth'
import auth from '../../utils/firebase'
import clsx from 'clsx'

export const NavMenuDropdown = () => {
    const router = useRouter()
    const { user } = useAuth()
    const [isMenuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setMenuOpen(!isMenuOpen)}
            >
                <div className="pl-1">
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                            display: 'block',
                            fill: 'none',
                            height: '16px',
                            width: '16px',
                            stroke: 'currentcolor',
                            strokeWidth: '3',
                            overflow: 'visible',
                        }}
                    >
                        <g fill="none" fillRule="nonzero">
                            <path d="m2 16h28"></path>
                            <path d="m2 24h28"></path>
                            <path d="m2 8h28"></path>
                        </g>
                    </svg>
                </div>
                <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                            display: ' block',
                            height: '100%',
                            width: '100%',
                            fill: 'currentcolor',
                        }}
                    >
                        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                    </svg>
                </div>
            </button>

            <div
                className={clsx(
                    'bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600',
                    {
                        hidden: !isMenuOpen,
                    }
                )}
            >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{user?.displayName}</div>
                    <div className="font-medium truncate">{user?.email}</div>
                </div>
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Earnings
                        </a>
                    </li>
                </ul>
                <div className="py-2">
                    <button
                        onClick={() =>
                            signOut(auth).then(() => router.push('/login'))
                        }
                        className="block px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-whit"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </>
    )
}
