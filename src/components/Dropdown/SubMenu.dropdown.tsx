import clsx from 'clsx'
import React, { memo, useEffect, useRef, useState } from 'react'

interface SubMenuDropdownProps<T> {
    name: string
    items: Array<T>
    setStateT: React.Dispatch<React.SetStateAction<any>>
    currentState?: Array<string>
}

const SubMenuDropdown = function SubMenuDropdown<
    T extends Record<string, any>
>({ name, items, setStateT, currentState }: SubMenuDropdownProps<T>) {
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

    const handleCheckSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...(currentState as string[])]
        if (event.target.checked) {
            updatedList = [
                ...(currentState as string[]),
                event.target.value as any,
            ]
        } else {
            updatedList.splice(
                (currentState as string[]).indexOf(event.target.value as any),
                1
            )
        }
        setStateT(updatedList)
    }

    return (
        <>
            <button
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowDropdown((prev) => !prev)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {name}
            </button>
            <div
                className={clsx(
                    'absolute top-0 left-[-145px] z-10 w-36 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600',
                    {
                        hidden: !showDropdown,
                    }
                )}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={ref}
            >
                <ul
                    className={clsx(
                        'space-y-1 text-sm text-gray-700 bg-white dark:text-gray-200'
                    )}
                >
                    {items?.map((item, idx) => (
                        <>
                            {item?.deviceShortName && (
                                <li key={idx}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600r">
                                        <input
                                            id={item.deviceShortName}
                                            type="radio"
                                            value={item.deviceShortName}
                                            name={name}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            onChange={(e) => {
                                                setStateT(item)
                                            }}
                                        />
                                        <label
                                            htmlFor={item.deviceShortName}
                                            className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            {item.deviceShortName}
                                        </label>
                                    </div>
                                </li>
                            )}
                            {item?.sensorName && (
                                <li>
                                    <div className="flex items-center p-2 rounded">
                                        <input
                                            id={item.sensorName}
                                            value={item.sensorName}
                                            type="checkbox"
                                            checked={currentState?.includes(
                                                item.sensorName
                                            )}
                                            onChange={handleCheckSensor}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor={item.sensorName}
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {item.sensorName}
                                        </label>
                                    </div>
                                </li>
                            )}
                        </>
                    ))}
                </ul>
            </div>
        </>
    )
}

export { SubMenuDropdown }
