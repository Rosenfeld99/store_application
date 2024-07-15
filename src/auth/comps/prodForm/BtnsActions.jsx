import React from 'react'
import { useNavigate } from 'react-router-dom'

const BtnsActions = ({ title, isDataValid }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between py-3">
            <h2 className="text-base font-semibold leading-7 text-gray-900">{title} </h2>
            <div className=" flex items-center justify-end gap-x-6">
                <button onClick={() => navigate(-1)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Discard
                </button>
                <button
                    disabled={isDataValid}
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-black disabled:cursor-not-allowed"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default BtnsActions