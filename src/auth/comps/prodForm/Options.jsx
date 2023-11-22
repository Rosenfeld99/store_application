import React, { useState } from 'react'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { IoMdCloseCircleOutline } from 'react-icons/io'

const Options = ({ product, setProduct }) => {
    const [toggelStock, setToggelStock] = useState(false)
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

    const handleDeleteColor = (indexOption, indexColor) => {
        let updatedProduct = { ...product };
        updatedProduct.sizes[indexOption].colors.splice(indexColor, 1);
        setProduct(updatedProduct);
    }

    const handleDeleteOption = (indexOption) => {
        console.log(indexOption);
        let updateProduct = { ...product }
        updateProduct.sizes = updateProduct.sizes.filter((__, index) => index != indexOption)
        console.log(updateProduct);
        setProduct(updateProduct)
    }

    return (
        <div className=" flex-col flex gap-3 py-4">
            <button type='button' className="btn btn-sm border-2 border-black rounded text-sm font-medium leading-6 text-gray-900 w-32"
                onClick={handleAddOptions}
            >
                Add options +
            </button>
            <div className="grid grid-cols-1 gap-3">
                {product?.sizes?.map((option, indexOption) => (<div key={indexOption} className="flex items-center">
                    <div className="  border-2 p-3 rounded flex w-full gap-5 overflow-x-scroll">
                        <div className="text-red-500 text-xl flex items-center" onClick={() => handleDeleteOption(indexOption)}>
                            <FaTrashAlt />
                        </div>
                        <div className="flex gap-1 flex-row">
                            <label >sizes </label>
                            <input
                                onChange={(e) => handleOptiomChanges(e, indexOption, "name")}
                                defaultValue={product?.sizes[indexOption]?.name}
                                type="text"
                                placeholder='Size'
                                className=' border px-2 rounded h-fit w-24'

                            />
                        </div>
                        <div className=" gap-1 flex flex-col">
                            <div className="flex items-center gap-2">
                                <label >Colors </label>
                                <button type='button' className=' border-2 rounded-full' onClick={() => handleAddNewColor(indexOption)}><FaPlus /></button>
                                <div className=' flex items-center gap-2'>{option?.colors?.map((color, indexBgClass) => (<div key={indexBgClass} className={` ${color?.class} rounded-full h-5 w-5 border-2 p-1`} />))}</div>
                            </div>
                            {option?.colors?.map((color, indexColor) => (
                                <div key={indexColor} className="flex items-center gap-2 flex-rox">
                                    <label > {color?.name === "" && color?.class === "" ? "Color" : <FaTrashAlt className=' text-red-500 ' onClick={() => handleDeleteColor(indexOption, indexColor)} />} </label>
                                    <input
                                        type="text" placeholder='Type' defaultValue={color?.name} className=' border px-2 rounded w-24' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "name")}
                                    />
                                    <input
                                        type="text" placeholder='Class' defaultValue={color?.class} className=' border px-2 rounded w-24' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "class")} />
                                    <input defaultValue={'ring-gray-400'} type="text" placeholder='SelectedClass' className=' border px-2 rounded w-28' onChange={(e) => handleColorChanges(e, indexOption, indexColor, "selectedClass")} />
                                </div>
                            ))}
                        </div>
                        <div className="gap-1 flex-row flex">
                            <label >Stock</label>
                            <div className="flex flex-row gap-2">
                                <button type='button' className={` btn btn-sm rounded ${product?.sizes[indexOption]?.inStock ? ' bg-green-600 text-white hover:bg-green-700' : ""}`}
                                    onClick={(e) => {
                                        setToggelStock(!toggelStock)
                                        handleOptiomChanges(toggelStock, indexOption, "inStock")
                                    }}>InStock <FaRegCircleCheck /></button>
                                <button type='button' className={` btn btn-sm rounded ${!product?.sizes[indexOption]?.inStock ? ' bg-red-600 text-white hover:bg-red-700' : ""}`}
                                    onClick={(e) => {
                                        setToggelStock(!toggelStock)
                                        handleOptiomChanges(toggelStock, indexOption, "inStock")
                                    }}>OutStock <IoMdCloseCircleOutline /></button>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>)
}

export default Options