import { PhotoIcon } from '@heroicons/react/24/outline'
import { FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react'
import { FaPlus, FaRegCircleCheck } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from "react-icons/io";

let dummyImages = [
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 1 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 2 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 3 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 4 },
]

const ProdAdminDetail = () => {
    const [product, setProduct] = useState({ images: dummyImages } || {})
    const [toggelStock, setToggelStock] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(product);
    }

    const filteredImages = (idDel) => {
        console.log(idDel);
        dummyImages = dummyImages.filter((img) => img.imageId !== idDel)
        // console.log(dummyImages);
        setProduct({ ...product, images: dummyImages })
    }

    const handleAddImage = (newImage) => {
        const upDateImages = product.images
        upDateImages.push({ src: newImage, alt: 'some text', imageId: Date.now() })
        setProduct({ ...product, images: upDateImages })
        console.log(upDateImages);
    }

    const handleAddOptions = () => {
        let newOption = {
            name: '',
            inStock: false,
            colors: [
                { name: '', class: '', selectedClass: '' },
            ]
        }
        let upDateOptions = product?.sizes || []
        upDateOptions.push(newOption)
        setProduct({ ...product, sizes: upDateOptions })
        console.log(product.sizes);
    }

    const handleColorChanges = (e, indexOption, indexColor, upDateProperty) => {
        const newValue = e.target.value;
        let updatedProduct = { ...product };
        let updatedColor = updatedProduct.sizes[indexOption].colors[indexColor] || {};

        switch (upDateProperty) {
            case "name":
                updatedColor.name = newValue;
                break;
            case "class":
                updatedColor.class = newValue;
                break;
            case "selectedClass":
                updatedColor.selectedClass = newValue;
                break;
            default:
                break;
        }
        setProduct(updatedProduct);
        console.log(product);
    };

    const handleOptiomChanges = (e, indexOption, keyOption) => {
        console.log(keyOption);
        let upDateSize = product.sizes || []
        switch (keyOption) {
            case "name":
                const newValue = e.target.value;
                upDateSize[indexOption].name = newValue
                break;
            case "inStock":
                upDateSize[indexOption].inStock = e
                break
            default:
                break;
        }
        setProduct({ ...product, sizes: upDateSize })
        // console.log(newValue, indexOption, KeyOption);
        console.log(product);
    }

    const handleAddNewColor = (indexOption) => {
        const newColor = { name: '', class: '', selectedClass: '' };
        let updateProduct = { ...product }
        let updatedColor = updateProduct?.sizes[indexOption].colors || []
        updatedColor.push(newColor)
        setProduct(updateProduct)
    }
    
    const handleDeleteColor = ( indexOption,indexColor) =>{
        let updatedProduct = { ...product };
        updatedProduct.sizes[indexOption].colors.splice(indexColor, 1);
        setProduct(updatedProduct);
    }
    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28 '>
            <div className="flex items-center justify-between pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Product Detail </h2>
                <div className=" flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className=" border-t border-gray-900/10 ">
                        <div className="mt-10 ">
                            <div className="sm:col-span-4">
                                <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                            type="text"
                                            value={product?.name}
                                            name="productName"
                                            id="productName"
                                            defaultValue={''}
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
                                        value={product?.description}
                                        id="description"
                                        name="description"
                                        rows={3}
                                        placeholder='Product description'
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                            </div>



                            {/* Add options */}
                            <div className=" flex-col flex gap-3 py-4">
                                <button type='button' className="btn btn-sm border-2 border-black rounded text-sm font-medium leading-6 text-gray-900 w-32"
                                    onClick={handleAddOptions}
                                >
                                    Add options +
                                </button>
                                <div className="grid grid-cols-1 gap-3">
                                    {product?.sizes?.map((option, indexOption) => (<div key={indexOption} className="flex items-center">
                                        <div className="  border-2 p-3 rounded flex w-full gap-5 overflow-x-scroll">
                                            <div className="text-red-500 text-xl flex items-center">
                                                <FaTrashAlt />
                                            </div>
                                            <div className="flex gap-1 flex-row">
                                                <label >sizes </label>
                                                <input onChange={(e) => handleOptiomChanges(e, indexOption, "name")} value={product?.sizes[indexOption]?.name} type="text" placeholder='Size' className=' border px-2 rounded h-fit w-24' />
                                            </div>
                                            <div className=" gap-1 flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <label >Colors </label>
                                                    <button type='button' className=' border-2 rounded-full' onClick={() => handleAddNewColor(indexOption)}><FaPlus /></button>
                                                    <div className=' flex items-center gap-2'>{option?.colors?.map((color, indexBgClass) => (<div key={indexBgClass} className={` ${color?.class} rounded-full h-5 w-5 border-2 p-1`} />))}</div>
                                                </div>
                                                {option?.colors?.map((color, indexColor) => (
                                                    <div key={indexColor} className="flex items-center gap-2 flex-rox">
                                                        <label > {color?.name === "" && color?.class === "" ? "Color" : <FaTrashAlt className=' text-red-500 ' onClick={()=>handleDeleteColor(indexOption,indexColor)}/>} </label>
                                                        <input type="text" placeholder='Type' className=' border px-2 rounded w-24' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "name")} />
                                                        <input type="text" placeholder='Class' className=' border px-2 rounded w-24' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "class")} />
                                                        <input type="text" placeholder='SelectedClass' className=' border px-2 rounded w-28' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "selectedClass")} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="gap-1 flex-row flex">
                                                <label >Stock</label>
                                                <div className="flex flex-row gap-2">
                                                    <button className={` btn btn-sm rounded ${product?.sizes[indexOption]?.inStock ? ' bg-green-600 text-white hover:bg-green-700' : ""}`}
                                                        onClick={(e) => {
                                                            setToggelStock(!toggelStock)
                                                            handleOptiomChanges(toggelStock, indexOption, "inStock")
                                                        }}>InStock <FaRegCircleCheck /></button>
                                                    <button className={` btn btn-sm rounded ${!product?.sizes[indexOption]?.inStock ? ' bg-red-600 text-white hover:bg-red-700' : ""}`}
                                                        onClick={(e) => {
                                                            setToggelStock(!toggelStock)
                                                            handleOptiomChanges(toggelStock, indexOption, "inStock")
                                                        }}>OutStock <IoMdCloseCircleOutline /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>
                            </div>

                            {/* Priview images */}
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photos
                                </label>
                                <div className="mt-2 flex items-center gap-x-3" >
                                    {product?.images?.map((item,indexImage) => (
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
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Choose activity</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Click to display or hide product in store.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={(e) => setProduct({ ...product, activity: e.target.value })}
                                            checked={product?.activity === 'active'}
                                            value="active"
                                            id="active"
                                            name="activity"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="active" className="block text-sm font-medium leading-6 text-gray-900">
                                            Active (show)
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={(e) => setProduct({ ...product, activity: e.target.value })}
                                            checked={product?.activity === 'inactive'}
                                            value="inactive"
                                            id="inactive"
                                            name="activity"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="inactive" className="block text-sm font-medium leading-6 text-gray-900">
                                            Inactive (hide)
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProdAdminDetail