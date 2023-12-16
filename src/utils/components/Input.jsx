import React from 'react'

const Input = ({ funcState, placeholder, defaultValue,label }) => {
    const updateState = () => {
        return funcState()
    }
    return (
        <div className='my-2'>
            <label className="block text-sm font-medium leading-6">
                {label}
            </label>
            <input type="text" placeholder={placeholder} defaultValue={defaultValue} className="input input-bordered input-sm w-full max-w-xs rounded-md" />
        </div>)
}

export default Input