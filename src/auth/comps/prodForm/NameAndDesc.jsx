import React from 'react'

const NameAndDesc = ({ product, setProduct }) => {
  return (
    <>

      <div className="sm:col-span-4">
        <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              type="text"
              defaultValue={product?.name}
              name="productName"
              id="productName"
              // defaultValue={''}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Product name"
            />
          </div>
        </div>
      </div>

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

export default NameAndDesc