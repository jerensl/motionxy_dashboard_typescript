import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

interface RadioInputProps<T> {
    name: string
    items: Array<T>
    setStateT: React.Dispatch<React.SetStateAction<string>>
}

const RadioInput = function RadioInput<T extends Record<string, any>>({
    name,
    items,
    setStateT,
}: RadioInputProps<T>) {
    const [showDropdown, setShowDropdown] = useState(false)

    let ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handler = (event: Event) => {
            if (
                showDropdown &&
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handler)
        document.addEventListener('touchstart', handler)
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('touchstart', handler)
        }
    }, [showDropdown])

    const onMouseEnter = () => {
        setShowDropdown(true)
    }

    const onMouseLeave = () => {
        setShowDropdown(false)
    }

    const closeDropdown = () => {
        showDropdown && setShowDropdown(false)
    }

    return (
        <div className="relative w-full h-full">
            <button
                className="px-4 py-2 w-full hover:bg-gray-100"
                onClick={() => setShowDropdown((prev) => !prev)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {name}
            </button>
            <div
                className={clsx(
                    'absolute top-0 left-[-145px] w-full bg-white rounded-lg shadow',
                    {
                        hidden: !showDropdown,
                    }
                )}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={ref}
            >
                <ul
                    className={clsx('space-y-1 text-sm text-gray-700 bg-white')}
                >
                    {items.map((item, idx) => (
                        <li key={idx}>
                            <div className="flex items-center p-2 hover:bg-gray-100">
                                <input
                                    id={item.name}
                                    type="radio"
                                    value={item.name}
                                    name={name}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) => {
                                        setStateT(e.currentTarget.value)
                                    }}
                                />
                                <label
                                    htmlFor={item.name}
                                    className="w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {item.name}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { RadioInput }
