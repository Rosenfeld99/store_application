import { PhotoIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const Media = ({ product,setProduct }) => {
    const filteredImages = (idDel) => {
        console.log(idDel);
        let filterImages = product?.images?.filter((img) => img.imageId !== idDel)
        setProduct({ ...product, images: filterImages || [] })
    }

    const handleAddImage = (newImage) => {
        const upDateImages = product.images
        upDateImages.push({ src: newImage, alt: 'some text', imageId: Date.now() })
        setProduct({ ...product, images: upDateImages })
        console.log(upDateImages);
    }
    return (
        <>
            {/* Priview images */}
            <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Photos
                </label>
                <div className="mt-2 flex items-center gap-x-3" >
                    {product?.images?.map((item, indexImage) => (
                        <div key={indexImage} className=' relative max-w-[200px] '                                        >
                            <div className=' opacity-80 hover:opacity-100'>
                                <img src={item.src} className='rounded w-[10vw] h-[10vw] object-cover min-w-[60px] min-h-[60px]' alt={item.alt} />
                            </div>
                            <div onClick={() => {
                                filteredImages(item.imageId)
                            }} className=" absolute top-0 right-0 p-2 rounded-es-3xl border-b-2 border-l-2 border-dashed border-white text-sm md:text-lg text-white bg-red-500"><FaTrashAlt /></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload images */}
            <div className="border-b pb-12 col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Upload photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => { handleAddImage(e.target.files[0].name) }} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                <div className="divider w-56 mx-auto">OR</div>
                <div className="">
                    <input type="text" name="file-upload" id="file-upload" placeholder='Image URL' className='border-2 w-full p-3 rounded' onChange={(e) => { handleAddImage(e.target.value) }} />
                </div>
            </div>
        </>)
}

export default Media