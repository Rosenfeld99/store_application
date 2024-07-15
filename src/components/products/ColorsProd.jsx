import React, { useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'

const ColorsProd = ({selectedColor,setSelectedColor,product,classNames,selectedSize}) => {
    useEffect(()=>{
        product?.sizes && setSelectedColor(product?.sizes[0]?.colors[0])
    },[product])
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>

            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                <div className="flex items-center space-x-3">
                    {selectedSize?.colors?.map((color) => (
                        <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                                classNames(
                                    color.selectedClass,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                )
                            }
                        >
                            <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                            </RadioGroup.Label>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    color.class,
                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                )}
                            />
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>)
}

export default ColorsProd