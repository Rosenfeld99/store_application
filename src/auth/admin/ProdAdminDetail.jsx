import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import BtnsActions from '../comps/prodForm/BtnsActions';
import ChooseActivity from '../comps/prodForm/ChooseActivity';
import Highlights from '../comps/prodForm/Highlights';
import Details from '../comps/prodForm/Details';
import Options from '../comps/prodForm/Options';
import Media from '../comps/prodForm/Media';
import NameAndDesc from '../comps/prodForm/NameAndDesc';
import { useParams } from 'react-router-dom';

let dummyImages = [
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 1 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 2 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 3 },
    { src: "http://localhost:5173/sets_worker_silver.png", alt: "some iamge", imageId: 4 },
]

const ProdAdminDetail = () => {
    const { id } = useParams()
    const [isNewProd, seIsNewProd] = useState(id === "new")
    console.log(isNewProd);
    console.log(id);
    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "products", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
                setProduct(docSnap.data())
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        !isNewProd && fetchSingleData()
    }, [id])
    const [product, setProduct] = useState({ images: dummyImages } || {})

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

    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <form onSubmit={handleSubmit}>
                {/* Btns Action */}
                <BtnsActions title={isNewProd ? "New Product" : "Edit Product"} />
                <div className="space-y-12">
                    <div className=" border-t border-gray-900/10 ">
                        <div className="mt-10 ">
                            {/* Nmae And Deacription */}
                            <NameAndDesc product={product} setProduct={setProduct} />

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
                    <ChooseActivity product={product} setProduct={setProduct} />
                </div>
                {/* Btns Action */}
                <BtnsActions />
            </form>
        </div>
    )
}

export default ProdAdminDetail