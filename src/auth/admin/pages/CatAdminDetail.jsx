import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import BtnsActions from '../../comps/prodForm/BtnsActions';
import Media from '../../comps/prodForm/Media';
import Options from '../../comps/prodForm/Options';
import Details from '../../comps/prodForm/Details';
import Highlights from '../../comps/prodForm/Highlights';
import ChooseActivity from '../../comps/prodForm/ChooseActivity';
import Name from '../../comps/prodForm/Name';
import Modal from '../../../utils/components/Modal';
import Input from '../../../utils/components/Input';
import ImageUpload from '../../../utils/components/ImageUpload';
import { FaTrash, FaPen } from 'react-icons/fa6';

const CatAdminDetail = () => {
    const { id } = useParams()
    const [isNewCat, seIsNewCat] = useState(id === "new")
    const [isNewFeatured, setIsNewFeatured] = useState(true)
    const [category, setCategory] = useState({})
    const [featured, setFeatured] = useState(
        //     category?.featured || [
        //     { id: 1, href: "google.com", name: "new avirals", imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png", imageAlt: "New featured" },
        //     { id: 2, href: "wikipdia.com", name: "new doc", imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/2048px-Wikipedia%27s_W.svg.png", imageAlt: "New featured" },
        // ]
    )
    const [newFeatured, setNewFeatured] = useState({ href: "", name: "", imageSrc: "", imageAlt: "", id: Date.now() })
    const [open, setOpen] = useState(false)
    console.log(isNewCat);
    console.log(id);
    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "categories", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
                setCategory(docSnap.data())
                setFeatured(docSnap.data()?.featured)
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        !isNewCat && fetchSingleData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCategory({...category,"featured":featured})
        console.log(category);

        if (isNewCat) {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "categories"), {
                ...category,
                date: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } else {
            console.log(category);
            // Set the "category" field of the categories
            const washingtonRef = doc(db, "categories", id);
            await updateDoc(washingtonRef, {
                ...category
            });
        }
    }


    const handleAddFeatured = () => {
        setFeatured([...featured, newFeatured])
        initFeaturedObject()
        setOpen(false)
    }

    const handleDeleteFeatured = (featuredId) => {
        const filteredArray = featured?.filter((item) => item?.id !== featuredId)
        setFeatured(filteredArray)
    }
    const handleUpdateFeatured = () => {
        let updateArray = [...featured];
        for (let index = 0; index < featured?.length; index++) {
            if (featured[index]?.id === newFeatured?.id) {
                console.log(updateArray);
                updateArray[index] = {
                    ...updateArray[index],
                    name: newFeatured?.name,
                    href: newFeatured?.href,
                    imageAlt: newFeatured?.imageAlt,
                    imageSrc: newFeatured?.imageSrc,
                };
            }
        }

        setFeatured(updateArray);
        initFeaturedObject()
        setIsNewFeatured(true)
        setOpen(false)
    };

    const initFeaturedObject = () => {
        setIsNewFeatured(true)
        return setNewFeatured({ href: "", name: "", imageSrc: "", imageAlt: "", id: Date.now() })
    }

    const contentFeatured = <>
        {/* featured Name */}
        <Input value={newFeatured?.name} setState={''} funcState={(e) => setNewFeatured({ ...newFeatured, "name": e.target.value })} placeholder={"Featured name"} label={"Name"} />
        {/* featured Href */}
        <Input value={newFeatured?.href} setState={''} funcState={(e) => setNewFeatured({ ...newFeatured, "href": e.target.value })} placeholder={"Featured href"} label={"Href"} />
        {/* featured ImageSrc & ImageAlt*/}
        <ImageUpload state={newFeatured} setState={setNewFeatured} />
        <div className=' flex items-center gap-2'>
            <button disabled={
                newFeatured?.name === "" || newFeatured?.imageSrc === "" ||
                newFeatured?.imageAlt === "" ||
                newFeatured?.href === ""} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={isNewFeatured ? handleAddFeatured : handleUpdateFeatured
                }>{isNewFeatured ? "Add" : "Update"}</button>
            <button onClick={() => {
                setOpen(false), initFeaturedObject()
            }} className=' btn btn-sm rounded-md'>Cancel</button>
        </div>
    </>
    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <form onSubmit={handleSubmit}>
                {/* Btns Action */}
                <BtnsActions title={isNewCat ? "New category" : "Edit category"} />
                <div className="space-y-12">
                    <div className=" border-t border-gray-900/10 ">
                        <div className="mt-10 ">
                            {/* Nmae And Deacription */}
                            <Name placeHolder={"Category name"} keyName={"categoryName"} setState={setCategory} state={category} />

                            {/* Modal add fretureds */}
                            <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                Featureds
                            </label>
                            <Modal initFeaturedObject={initFeaturedObject} open={open} setOpen={setOpen} title={"Add featured!"} content={contentFeatured} btnOpenModal={"Add featured"} />
                            <div className=' grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                                {featured?.map((item) => (<div key={item?.id} className=' flex items-center gap-3 justify-between p-2 bg-gray-100 w-full rounded-sm overflow-x-auto'>
                                    <div className=' flex items-center gap-3'>
                                        <img className='h-[50px] w-[50px] object-cover rounded-md' src={item?.imageSrc} alt={item?.imageAlt} />
                                        <p>{item?.name?.substring(0, 10)}</p>
                                        <p>{item?.href?.substring(0, 10)}</p>
                                    </div>
                                    <div className=' flex items-center gap-2'>
                                        <button onClick={() => {
                                            setOpen(true)
                                            const singleFeatured = featured?.find((searchItem) => searchItem?.id === item?.id)
                                            setNewFeatured(singleFeatured)
                                            console.log(singleFeatured);
                                            setIsNewFeatured(false)
                                        }} className=' btn btn-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white'><FaPen /></button>
                                        <button onClick={() => { handleDeleteFeatured(item?.id) }} className=' btn btn-sm bg-red-600 hover:bg-red-700 rounded-md text-white'><FaTrash /></button>
                                    </div>
                                </div>))}
                            </div>
                            {/* Media */}
                            {/* <Media product={category} setProduct={setCategory} /> */}

                            {/* Add options */}
                            {/* <Options product={category} setProduct={setCategory} /> */}

                            {/* Product detail */}
                            {/* <Details product={category} setProduct={setCategory} /> */}

                            {/* Product highlights */}
                            {/* <Highlights product={category} setProduct={setCategory} /> */}

                        </div>
                    </div>
                    {/* Choose activity */}
                    {/* <ChooseActivity product={category} setProduct={setCategory} /> */}
                </div>
                {/* Btns Action */}
                <BtnsActions />
            </form>
        </div>)
}

export default CatAdminDetail