import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import ImageUpload from '../../../utils/components/ImageUpload';

const Media = ({ product, setProduct }) => {
    const [uploadImage, setUploadImage] = useState(null)
    const [imageURL, setImageURL] = useState({ imageSrc: "", imageAlt: "" })
    console.log(uploadImage);
    const filteredImages = (idDel) => {
        console.log(idDel);
        let filterImages = product?.images?.filter((img) => img.imageId !== idDel)
        setProduct({ ...product, images: filterImages || [] })
    }

    const handleAddImage = (newImageSrc, newImageAlt) => {
        const upDateImages = product.images || []
        upDateImages?.push({ src: newImageSrc, alt: newImageAlt, imageId: Date.now() })
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
                <ImageUpload setState={setUploadImage} state={uploadImage} style=" max-w-[350px]" />
                {uploadImage?.imageSrc && <button className=' btn btn-sm bg-blue-400 rounded text-white' onClick={() => { handleAddImage(uploadImage?.imageSrc, uploadImage?.imageAlt), setUploadImage(null) }} type='button'>Add</button>}
                <div className="divider w-56 mx-auto">OR</div>
                <div className=" lg:flex-row items-center gap-4 flex flex-col">
                    <input type="text" value={imageURL?.imageSrc} name="file-upload" id="file-upload" placeholder='Image URL' className='border-2 w-full p-3 rounded' onChange={(e) => { setImageURL({ ...imageURL, imageSrc: e.target.value }) }} />
                    <input type="text" value={imageURL?.imageAlt} name="file-upload" id="file-upload" placeholder='Image Alt' className='border-2 w-full p-3 rounded' onChange={(e) => { setImageURL({ ...imageURL, imageAlt: e.target.value }) }} />
                    {imageURL?.imageSrc && <button className={` btn bg-blue-400 rounded text-white ${imageURL?.imageSrc === "" || imageURL?.imageAlt === "" ? "disabled:cursor-not-allowed" : " cursor-pointer"}`} onClick={() => { handleAddImage(imageURL?.imageSrc, imageURL?.imageAlt), setImageURL({ imageSrc: "", imageAlt: "" }) }} type='button' disabled={imageURL?.imageSrc === "" || imageURL?.imageAlt === ""}>Add</button>}
                </div>
            </div>
        </>)
}

export default Media