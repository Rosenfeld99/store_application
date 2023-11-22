import React from 'react'

const Details = ({setProduct,product}) => {
    return (
        <div className="col-span-full">
            <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                Details
            </label>
            <div className="mt-2">
                <textarea
                    onChange={(e) => setProduct({ ...product, details: e.target.value })}
                    value={product?.details}
                    id="details"
                    name="details"
                    rows={3}
                    placeholder='Product details'
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
            </div>
        </div>)
}

export default Details