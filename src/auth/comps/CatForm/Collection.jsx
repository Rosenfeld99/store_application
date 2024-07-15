import React from 'react'
import { Modal } from '../../../utils/components'

const Collection = ({ initState, open, setOpen, title, content, state, handleDeleteProd }) => {
    return (
        <div>
            {/* Product Modal select */}
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                Collections
            </label>
            <Modal initState={initState} open={open} setOpen={setOpen} title={title} content={content} btnOpenModal={"Add products"} />

            {/* Render products select */}
            {state?.items?.length > 0 && <div className=" grid grid-cols-1 bg-gray-100 py-5 rounded-sm max-w-sm shadow-md">
                <h3 className=' border-b px-5 pb-2 font-semibold'>Products</h3>
                {state?.items?.map((item, index) => (
                    <div className=" flex items-center justify-between px-5 py-2.5 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <p>{index + 1}.</p>
                            <img className=' w-10 h-10 object-cover rounded-md border-[1px] border-black' src={item?.imageSrc} alt={item?.imageAlt} />
                            <p className="label-text">{item?.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className={`${item?.activity === "active" ? " bg-green-300" : " bg-red-300"} py-0.5 px-1 rounded text-gray-600 text-sm`}>{item?.activity}</p>
                            <button
                                type='button'
                                onClick={() => { handleDeleteProd(item?.href) }}
                                className="btn btn-sm text-gray-600 btn-circle btn-ghost p-1"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Collection