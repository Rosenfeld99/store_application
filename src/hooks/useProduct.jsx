import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { collection, deleteDoc, doc, getDoc, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const useProduct = () => {
    const { productList, setProductList, singleProduct, setSingleProduct } = useContext(ProductContext)
    console.log(productList);
    const fetchProductList = async () => {
        try {
            const dataList = []
            const q = query(collection(db, "products"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, ...doc.data() })
                // console.log(doc.id, " => ", doc.data());
            });
            setProductList(dataList)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSingleProduct = async (id,setState,isUpdateGlobalState) => {
        const ref = doc(db, "products", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            // Convert to City object
            setState && setState(docSnap.data())
            isUpdateGlobalState && setSingleProduct(docSnap.data())
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

    return { productList, setProductList, singleProduct, setSingleProduct, fetchProductList, fetchSingleProduct, deleteProduct }
}

export default useProduct