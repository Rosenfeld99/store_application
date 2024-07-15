import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const useCollection = () => {
    const { collectionList, setCollectionList, singleCollection, setSingleCollection } = useContext(ProductContext)
    const fetchCollectionList = async () => {
        try {
            const dataList = []
            const q = query(collection(db, "collections")
                // ,where("activity", "==", "active")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, ...doc.data() })
                // console.log(doc.id, " => ", doc.data());
            });
            setCollectionList(dataList)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSingleCollection = async (id, setState, isUpdateGlobalState) => {
        const ref = doc(db, "collections", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists() && docSnap?.data()?.activity === "active") {
            // 
            setState && setState({id,...docSnap.data()})
            isUpdateGlobalState && setSingleCollection({id,...docSnap.data()})
            console.log(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    const deleteProduct = async (productId) => {
        if (confirm("Delete product.?")) {
            let filterData = productList.filter((item) => item.id != productId)
            setProductList(filterData)
            await deleteDoc(doc(db, "products", productId));
        }
    }

    return { collectionList, setCollectionList, singleCollection, setSingleCollection, fetchCollectionList, fetchSingleCollection, deleteProduct }
}

export default useCollection