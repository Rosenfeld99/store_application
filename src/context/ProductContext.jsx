import React, { createContext, useState } from 'react'

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [productList, setProductList] = useState(null)
    const [singleProduct, setSingleProduct] = useState(null)
    const [singleCollection, setSingleCollection] = useState(null)
    const [collectionList, setCollectionList] = useState(null)

    return (
        <ProductContext.Provider value={{ productList, setProductList, singleProduct, setSingleProduct,collectionList, setCollectionList,singleCollection, setSingleCollection }}>
            {children}
        </ProductContext.Provider>
    )
}