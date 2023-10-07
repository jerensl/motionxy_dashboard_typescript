import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { IDevice, ISensor } from '../../types/device'
import { RadioInput } from '../Input/Radio.input'
import { CheckboxInput } from '../Input/Checkbox.input'

interface MenuDropdownProps {
    devices: Array<Omit<IDevice, 'sensors'>>
    sensors: Array<ISensor>
    sensorChecked: Array<string>
    setDevice: React.Dispatch<React.SetStateAction<string>>
    setSensor: React.Dispatch<React.SetStateAction<Array<string>>>
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
    devices,
    sensors,
    sensorChecked,
    setDevice,
    setSensor,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null)
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
            <button
                className="ml-auto inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
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
                    'absolute top-14 right-0 bg-white rounded-lg shadow w-36',
                    {
                        hidden: !isActive,
                    }
                )}
            >
                <ul
                    className="flex flex-col py-2 text-sm text-gray-700 rounded-lg shadow"
                    aria-labelledby="dropdownMenuIconButton"
                >
                    <RadioInput
                        name="Devices"
                        items={devices.map(({ deviceShortName }) => ({
                            name: deviceShortName,
                        }))}
                        setStateT={setDevice}
                    />
                    <CheckboxInput
                        name="Sensors"
                        labels={sensors.map(({ sensorName }) => sensorName)}
                        values={sensors.map(({ sensorName }) => sensorName)}
                        setStateT={setSensor}
                        checkedItems={sensorChecked}
                    />
                </ul>
            </div>
        </div>
    )
}
