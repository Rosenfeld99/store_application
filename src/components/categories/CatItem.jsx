import React from 'react'

const CatItem = () => {
    return (
        <div className="carousel-item w-full max-w-[200px] h-full relative">
            <img className=" w-full h-full object-cover min-h-[250px] rounded-box" src="/sets_pigro_silver.png" />
            <div className="absolute bottom-5 left-0 w-full bg-white border-x-2 p-1">
                <h4 className=" flex items-center justify-center font-bold">Cat name</h4>
            </div>
        </div>)
}

export default CatItem