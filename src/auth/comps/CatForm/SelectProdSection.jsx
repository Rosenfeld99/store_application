import React from 'react'

const SelectProdSection = ({ prodList, newState, handleToggelItemsState }) => {
    console.log(prodList);
    console.log(newState);

    return (
        <div>
            <label className="block text-sm font-medium leading-6">
                Products
            </label>
            <div className=" flex flex-col gap-2 rounded-md overflow-x-auto h-full max-h-[180px] border-[1px] input-bordered">
                {prodList?.map((item) => (<div key={item?.id} className={`form-control ${newState?.items?.some((x) => x?.href == item?.id) ? " bg-gray-100" : ""}`}>
                    <label className="cursor-pointer flex items-center justify-between rounded-md py-1 px-2 w-full select-none hover:bg-gray-100">
                        <div className=" flex items-center gap-4">
                            <img className=' w-10 h-10 object-cover rounded-md border-[1px] border-black' src={item?.imageSrc} alt={item?.imageAlt} />
                            <p className="label-text">{item?.name}</p>
                        </div>
                        <input type="checkbox"
                            onChange={() => handleToggelItemsState({ href: item?.id, name: item?.name, imageSrc: item?.imageSrc, imageAlt: item?.imageAlt, activity: item?.activity })}
                            checked={newState?.items?.some((x) => x?.href == item?.id) ? true : false}
                            className="checkbox" />
                    </label>
                </div>))}
            </div>
        </div>
    )
}

export default SelectProdSection