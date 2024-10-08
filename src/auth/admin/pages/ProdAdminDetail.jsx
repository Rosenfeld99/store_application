import React, { useEffect, useState } from 'react'
import { doc, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { Name, BtnsActions, ChooseActivity, Description, Details, Highlights, Media, Options } from '../../comps/prodForm';
import { useParams } from 'react-router-dom';
import useProduct from '../../../hooks/useProduct';

const ProdAdminDetail = () => {
    const {fetchSingleProduct} = useProduct()
    const [product, setProduct] = useState({name: "", activity: ""})
    const { id } = useParams()
    const [isNewProd, seIsNewProd] = useState(id === "new")
    const [validateCategory, setValidateCategory] = useState(true)

    console.log(isNewProd);
    console.log(id);
    useEffect(() => {
        !isNewProd && fetchSingleProduct(id,setProduct,false)
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(product);
        if (isNewProd) {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "products"), {
                ...product,
                date: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } else {
            // Set the "capital" field of the city 'DC'
            const washingtonRef = doc(db, "products", id);
            await updateDoc(washingtonRef, {
                ...product
            });
        }
    }

    useEffect(() => {
        setValidateCategory(product?.activity === "" || product?.name === "")
        console.log(product);
    }, [product])

    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <form onSubmit={handleSubmit}>
                {/* Btns Action */}
                <BtnsActions title={isNewProd ? "New Product" : "Edit Product"} isDataValid={validateCategory} />
                <div className="space-y-12">
                    <div className=" border-t border-gray-900/10 ">
                        <div className="mt-10 ">
                            {/* Product name */}
                            <Name placeHolder={"Product name"} keyName={"productName"} setState={setProduct} state={product} />

                            {/* Deacription */}
                            <Description product={product} setProduct={setProduct} />

                            {/* Media */}
                            <Media product={product} setProduct={setProduct} />

                            {/* Add options */}
                            <Options product={product} setProduct={setProduct} />

                            {/* Product detail */}
                            <Details product={product} setProduct={setProduct} />

                            {/* Product highlights */}
                            <Highlights product={product} setProduct={setProduct} />

                        </div>
                    </div>
                    {/* Choose activity */}
                    <ChooseActivity state={product} setState={setProduct} type={"product"} />
                </div>
                {/* Btns Action */}
                <BtnsActions isDataValid={validateCategory} />
            </form>
        </div>
    )
}

export default ProdAdminDetail