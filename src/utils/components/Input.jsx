import React from 'react'

const Input = ({ funcState, placeholder, defaultValue,label,value }) => {
    const updateState = (e) => {
        return funcState(e)
    }
    return (
        <div className='my-2'>
            <label className="block text-sm font-medium leading-6">
                {label}
            </label>
            <input type="text" onChange={updateState} placeholder={placeholder} defaultValue={defaultValue} value={value} className="input input-bordered input-sm w-full max-w-xs rounded-md" />
        </div>)
}

export default Input