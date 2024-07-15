import React from 'react'

const Description = ({ product, setProduct }) => {
  return (
    <>
      <div className="col-span-full">
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <div className="mt-2">
          <textarea
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            defaultValue={product?.description}
            id="description"
            name="description"
            rows={3}
            placeholder='Product description'
            className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
      </div>
    </>)
}

export default Description