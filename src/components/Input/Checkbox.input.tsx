import clsx from 'clsx'
import React, { memo, useEffect, useRef, useState } from 'react'

interface CheckboxInputProps {
    name: string
    labels: string[]
    values: string[]
    setStateT: React.Dispatch<React.SetStateAction<string[]>>
    checkedItems: Array<string>
}

const CheckboxInput = function CheckboxInput({
    name,
    labels,
    values,
    setStateT,
    checkedItems,
}: CheckboxInputProps) {
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
        let updatedList = [...checkedItems]
        if (event.target.checked) {
            updatedList = [...checkedItems, event.target.value]
        } else {
            updatedList.splice(checkedItems.indexOf(event.target.value), 1)
        }
        setStateT(updatedList)
    }

    return (
        <div className="relative w-full h-full">
            <button
                className="px-4 py-2 w-full hover:bg-gray-100"
                onClick={() => setShowDropdown((prev) => !prev)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={values.length == 0}
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
                    {labels.map((label, idx) => (
                        <li key={idx}>
                            <div className="flex items-center p-2">
                                <input
                                    id={label}
                                    value={values[idx]}
                                    type="checkbox"
                                    checked={checkedItems.includes(values[idx])}
                                    onChange={handleCheckSensor}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    htmlFor={label}
                                    className="ml-2 text-sm font-medium text-gray-900"
                                >
                                    {label}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { CheckboxInput }
