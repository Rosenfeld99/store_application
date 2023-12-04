import React from 'react'
import ProdItem from './ProdItem'

const ProdList = () => {
    return (
        <div className="py-10 xl:px-0 px-4">
            <h3 className=" py-3 font-bold text-2xl">Hot Products</h3>
            <div className="carousel carousel-center space-x-4 rounded-box">
                {[1, 2, 3, 4].map((item, i) => (
                    <ProdItem key={i} />
                ))}
            </div>
        </div>)
}

export default ProdList