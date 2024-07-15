import React from 'react'
import { Link } from 'react-router-dom'

const ProdItem = ({ item }) => {

    return (
        <div className="carousel-item w-full max-w-[200px] h-full">
            <Link to={`/products/${item?.href}`}>
                <img className=" w-[200px] h-[200px] min-h-max object-cover rounded-box" src={item?.imageSrc} alt={item?.imageAlt} />
            </Link>
        </div>
    )
}

export default ProdItem