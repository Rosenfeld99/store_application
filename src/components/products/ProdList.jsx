import React, { useEffect, useState } from 'react'
import ProdItem from './ProdItem'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

const ProdList = () => {
    const [prodList, setProdList] = useState([])

    const fetchData = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, ...doc.data() })
                // console.log(doc.id, " => ", doc.data());
            });
            setProdList(dataList)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(prodList);
    return (
        <div className="py-10 xl:px-0 px-4">
            <h3 className=" py-3 font-bold text-2xl">Hot Products</h3>
            <div className="carousel carousel-center space-x-4 rounded-box">
                {prodList?.map((item, i) => (
                    <ProdItem key={i} item={item} />
                ))}
            </div>
        </div>)
}

export default ProdList