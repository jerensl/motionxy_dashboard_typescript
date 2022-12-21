import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ISensor } from '../../types/device'

interface SensorsDropdownProps {
    sensors: Array<ISensor> | undefined
    handleCheckSensor: (event: React.ChangeEvent<HTMLInputElement>) => void
    sensor: Array<string>
}

const SensorsDropdown: React.FC<SensorsDropdownProps> = ({
    sensors,
    sensor,
    handleCheckSensor,
}) => {
    return (
        <Popover className="relative my-auto pt-6">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
${open ? '' : 'text-opacity-90'}
group inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
                    >
                        <span>Sensors</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10">
                            <div className="z-10 bg-white rounded shadow">
                                <ul
                                    className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200"
                                    aria-labelledby="dropdownSearchButton"
                                >
                                    {sensors?.map((item, index) => (
                                        <li
                                            key={index}
                                            className="w-full rounded-t-lg border-b border-gray-200"
                                        >
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                                <input
                                                    value={item.sensorName}
                                                    type="checkbox"
                                                    checked={sensor.includes(
                                                        item.sensorName
                                                    )}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 ring-offset-1 focus:ring-2 focus:ring-blue-500"
                                                    onChange={handleCheckSensor}
                                                    id={`checkbox-item-${index}`}
                                                />
                                                <label
                                                    htmlFor={`checkbox-item-${index}`}
                                                    className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                                                >
                                                    {item.sensorName}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default SensorsDropdown
