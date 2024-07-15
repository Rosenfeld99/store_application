import React, { useState } from 'react'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'

const Highlights = ({ product, setProduct }) => {
    const [highlights, setHighlights] = useState([])


    const handleAddHighlights = (e) => {
        const highlights_Ar = product.highlights || []
        highlights_Ar.push(highlights)
        setProduct({ ...product, highlights: highlights_Ar })
        setHighlights("")
        console.log(product);
    }

    const handleDeleteHighlights = (indexHighlight) => {
        console.log(indexHighlight);
        const productHighlights = product.highlights || []
        let updateHighlights = productHighlights.filter((__, index) => index !== indexHighlight)
        setProduct({ ...product, highlights: updateHighlights })
        console.log(product);
    }

    // const handleUpdateHighlights = (indexHighlight, e) => {
    //     console.log(indexHighlight);
    //     const productHighlights = product.highlights || []
    //     let updateHighlights = productHighlights
    //     updateHighlights[indexHighlight] = e.target.value
    //     setProduct({ ...product, highlights: updateHighlights })
    //     console.log(product);
    // }
    return (
        <div className="col-span-full">
            <label htmlFor="highlights" className="block text-sm font-medium leading-6 text-gray-900">
                highlights
            </label>
            <div className="mt-2 relative">
                <input
                    onChange={(e) => setHighlights(e.target.value)}
                    value={highlights}
                    id="highlights"
                    name="highlights"
                    placeholder='Product highlights'
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <FaPlus className=' absolute top-4 right-3 bg-slate-50' onClick={handleAddHighlights} />
            </div>
            {/* View highlights */}
            {product?.highlights?.map((item, indexHighlight) => (<div key={indexHighlight} className="mt-2 relative">
                <input
                    // onChange={() => handleUpdateHighlights(indexHighlight)}
                    defaultValue={item}
                    id="highlights"
                    name="highlights"
                    placeholder='Product highlights'
                    className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex items-center absolute top-2 gap-3 right-3">
                    {/* <button type='button' className=' btn btn-sm bg-transparent border-blue-500 text-blue-500' onClick={(e) => handleUpdateHighlights(indexHighlight, e)} >Edit</button> */}
                    <FaTrashAlt className=' cursor-pointer text-red-500' onClick={() => handleDeleteHighlights(indexHighlight)} />
                </div>
            </div>))}
        </div>)
}

export default Highlights