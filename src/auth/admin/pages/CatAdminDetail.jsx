import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { BtnsActions, ChooseActivity, Name } from '../../comps/prodForm';
import Featured from '../../comps/CatForm/Featured';
import Sections from '../../comps/CatForm/Sections';

const CatAdminDetail = () => {
    const { id } = useParams()
    const [validateCategory, setValidateCategory] = useState(true)
    const [isNewCat, seIsNewCat] = useState(id === "new")
    const [category, setCategory] = useState({ name: "", activity: "", featured: [], sections: [] })
    const [featured, setFeatured] = useState(category?.featured || [])
    const [sections, setSections] = useState(category?.sections || [])

    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "categories", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setCategory(docSnap.data())
                setFeatured(docSnap.data()?.featured)
                setSections(docSnap.data()?.sections)
                // console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        !isNewCat && fetchSingleData()
    }, [id])

    useEffect(() => {
        setCategory({ ...category, "featured": featured })
        // console.log(category);
    }, [featured])
    useEffect(() => {
        setCategory({ ...category, "sections": sections })
    }, [sections])
    useEffect(() => {
        setValidateCategory(category?.activity === "" || category?.name === "")
        console.log(category);
    }, [category])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isNewCat) {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "categories"), {
                ...category,
                date: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        }
        else {
            console.log(category);
            // Set the "category" field of the categories
            const washingtonRef = doc(db, "categories", id);
            await updateDoc(washingtonRef, {
                ...category,
            });
        }
    }
    
    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <form onSubmit={handleSubmit}>
                {/* Btns Action */}
                <BtnsActions title={isNewCat ? "New category" : "Edit category"} isDataValid={validateCategory} />
                <div className="space-y-12">
                    <div className=" border-t border-gray-900/10 ">
                        <div className="mt-10 ">
                            {/* Nmae And Deacription */}
                            <Name placeHolder={"Category name"} keyName={"categoryName"} setState={setCategory} state={category} />
                            {/* Modal add fretureds */}
                            <Featured setFeatured={setFeatured} featured={featured} />
                            {/* Sections */}
                            <Sections category={category} sections={sections} setSections={setSections} />
                            {/* Choose Activity */}
                            <ChooseActivity state={category} setState={setCategory} type={"category"} />
                        </div>
                    </div>
                </div>
                {/* Btns Action */}
                <BtnsActions isDataValid={validateCategory} />
            </form>
        </div>)
}

export default CatAdminDetail