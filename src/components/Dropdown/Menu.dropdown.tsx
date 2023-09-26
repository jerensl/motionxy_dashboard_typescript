import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

export const MenuDropdown = () => {
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const pageClickEvent = (e: MouseEvent) => {
            if (
                dropdownRef.current !== null &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsActive(!isActive)
            }
        }

        if (isActive) {
            window.addEventListener('click', pageClickEvent)
        }

        return () => {
            window.removeEventListener('click', pageClickEvent)
        }
    }, [isActive])

    return (
        <div className="flex justify-between" ref={dropdownRef}>
            <div></div>
            <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setIsActive(!isActive)}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 4 15"
                >
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
            </button>

            <div
                className={clsx(
                    'z-100 absolute top-14 right-3 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600',
                    {
                        hidden: !isActive,
                    }
                )}
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconButton"
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
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Separated link
                    </a>
                </div>
            </div>
        </div>
    )
}
