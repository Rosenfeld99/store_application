import React, { useEffect } from 'react'
import ProdItem from './ProdItem'
import useProduct from '../../hooks/useProduct'

const ProdList = () => {
    const {productList,fetchProductList} = useProduct()
    
    useEffect(() => {
        fetchProductList()
    }, [])
    console.log(productList);
    return (
        <div className="py-10 xl:px-0 px-4">
            <h3 className=" py-3 font-bold text-2xl">Hot Products</h3>
            <div className="carousel carousel-center space-x-4 rounded-box">
                {productList?.map((item, i) => (
                    <ProdItem key={i} item={item} />
                ))}
            </div>
        </div>)
}

export default ProdList