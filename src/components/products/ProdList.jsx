import React, { useEffect, useState } from 'react'
import ProdItem from './ProdItem'
import useCollection from '../../hooks/useCollection'

const ProdList = () => {
    const { fetchSingleCollection } = useCollection()
    const [singleCollection, setSingleCollection] = useState([])

    useEffect(() => {
        fetchSingleCollection("7qR7YxFFpusFbBrmpyVw", setSingleCollection)

    }, [])
    console.log(singleCollection);
    return (
        <div className="py-10 xl:px-0 px-4">
            <h3 className=" py-3 font-bold text-2xl">{singleCollection?.name}</h3>
            <div className="carousel carousel-center space-x-4 rounded-box">
                {singleCollection?.items?.map((item, i) => (
                    <ProdItem key={i} item={item} />
                ))}
            </div>
        </div>)
}

export default ProdList