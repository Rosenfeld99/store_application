import React from 'react'
import { useNavigate } from 'react-router-dom'

const CatItem = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/category/${item?.id}`)} className="carousel-item w-full max-w-[200px] h-full relative">
            <img className=" w-full h-full object-cover min-h-[250px] rounded-box" src={item?.imageSrc} alt={item?.imageAlt} />
            <div className="absolute bottom-5 left-0 w-full bg-white border-2 p-1">
                <h4 className=" flex items-center justify-center font-bold shadow-inner ">{item?.name}</h4>
            </div>
        </div>)
}

export default CatItem