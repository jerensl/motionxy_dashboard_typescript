import React from 'react'

export const CustomError: React.FC = () => {
    return (
        <div>
            <h1 className="font-bold text-xl text-center mt-40">
                500 Internal Server Error
            </h1>
            <p className="font-normal text-base text-center">
                Oops, something went wrong
            </p>
        </div>
    )
}
