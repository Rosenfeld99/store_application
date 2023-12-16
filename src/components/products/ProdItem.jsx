import React from 'react'
import { Link } from 'react-router-dom'

const ProdItem = ({ item }) => {

    return (
        <div className="carousel-item w-full max-w-[200px] h-full">
            <Link to={`/products/${item?.id}`}>
                <img className=" w-[200px] h-[200px] min-h-max object-cover rounded-box" src={item?.images[0]?.src} />
            </Link>
        </div>
    )
}

export default ProdItem