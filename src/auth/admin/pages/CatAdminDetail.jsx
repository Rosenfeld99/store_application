import { addDoc, collection as collectionFirebase, doc, getDoc, getDocs, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { BtnsActions, ChooseActivity, Name } from '../../comps/prodForm';
import Featured from '../../comps/CatForm/Featured';
import Sections from '../../comps/CatForm/Sections';
import Collection from '../../comps/CatForm/Collection';
import SelectProdSection from '../../comps/CatForm/SelectProdSection';
import { fetchAllProducts } from '../../../firebase/func';

const CatAdminDetail = () => {
    const { id } = useParams()
    const [validateCategory, setValidateCategory] = useState(true)
    const [isNewCat, seIsNewCat] = useState(id === "new")
    const [category, setCategory] = useState({ name: "", activity: "", featured: [], sections: [], collection: [] })
    const [featured, setFeatured] = useState(category?.featured || [])
    const [sections, setSections] = useState(category?.sections || [])

    const [collection, setCollection] = useState({ name: "", activity: "", items: [] })
    const [newCollection, setNewCollection] = useState(collection || { name: "", activity: "", items: [] })
    const [openModalCollection, setOpenModalCollection] = useState(false)
    const [prodList, setProdList] = useState([])
    useEffect(() => {
        fetchAllProducts(setProdList)
    }, [])

    const initCollection = () => {
        seIsNewCat(true)
        return setNewCollection(collection)
    }


    const handleToggelItemsItems = (prodItem) => {
        console.log(newCollection);
        console.log(prodItem);
        const isItemExists = newCollection?.items?.find((item) => item?.href == prodItem?.href)
        console.log(isItemExists);
        if (!isItemExists) {
            console.log("Add");
            const arrayItems = [...newCollection?.items, prodItem]
            return setNewCollection({ ...newCollection, "items": arrayItems })
        } else {
            console.log("Delete");
            const deleteItem = newCollection?.items?.filter((item) => item?.href !== prodItem?.href)
            return setNewCollection({ ...newCollection, "items": deleteItem })
        }
    }

    const handleDeleteProd = (idDel) => {
        const deleteProd = collection?.items?.filter((item) => item?.href !== idDel)
        setCollection({ ...collection, "items": deleteProd })
    }
    console.log(collection);
    console.log(category);





    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "categories", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setCategory(docSnap.data())
                setFeatured(docSnap.data()?.featured)
                setSections(docSnap.data()?.sections)
                setCollection(docSnap.data()?.collection || [])
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
        setCategory({ ...category, "collection": collection })
        setNewCollection(collection || category?.collection)
    }, [collection])
    useEffect(() => {
        setValidateCategory(category?.activity === "" || category?.name === "")
        console.log(category);
    }, [category])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isNewCat) {
            // Add a new document with a generated id.
            const docRef = await addDoc(collectionFirebase(db, "categories"), {
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
                            {/* Collections */}
                            <Collection initState={initCollection} open={openModalCollection} setOpen={setOpenModalCollection} title={isNewCat ? "Add products!" : "Update products!"} content={<>
                                <SelectProdSection handleToggelItemsState={handleToggelItemsItems} newState={newCollection} prodList={prodList} />
                                <div className=' flex items-center gap-2 mt-3'>
                                    <button type='button' disabled={
                                        newCollection?.items?.length === 0} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={() => { setCollection({ ...collection, "items": newCollection?.items }), setOpenModalCollection(false) }
                                        }>{false ? "Add" : "Update"}</button>
                                    <button type='button' onClick={() => {
                                        setOpenModalCollection(false), initCollection()
                                    }} className=' btn btn-sm rounded-md'>Cancel</button>
                                </div>
                            </>
                            } state={collection} handleDeleteProd={handleDeleteProd} />
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