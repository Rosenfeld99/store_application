import React from 'react'

const Name = ({setState,state,placeHolder,keyName}) => {
    // console.log(state);
    return (
        <div className="sm:col-span-4">
            <label htmlFor={keyName} className="block text-sm font-medium leading-6 text-gray-900">
                Name
            </label>
            <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                        type="text"
                        defaultValue={state?.name}
                        name={keyName}
                        id={keyName}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={placeHolder}
                    />
                </div>
            </div>
        </div>)
}

export default Name