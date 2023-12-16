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
import { FaTrash,FaPen } from 'react-icons/fa6';

const CatAdminDetail = () => {
    const { id } = useParams()
    const [isNewCat, seIsNewCat] = useState(id === "new")
    const [category, setCategory] = useState({})
    console.log(isNewCat);
    console.log(id);
    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "categories", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
                setCategory(docSnap.data())
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        !isNewCat && fetchSingleData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(category);
        if (isNewCat) {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "categories"), {
                ...category,
                date: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } else {
            // Set the "capital" field of the city 'DC'
            const washingtonRef = doc(db, "categories", id);
            await updateDoc(washingtonRef, {
                ...category
            });
        }
    }

    const contentFeatured = <>
        {/* featured Name */}
        <Input defaultValue={"some name"} funcState={''} placeholder={"Featured name"} label={"Name"} />
        {/* featured Href */}
        <Input defaultValue={"some href"} funcState={''} placeholder={"Featured name"} label={"Href"} />
        {/* featured ImageSrc & ImageAlt*/}
        <ImageUpload />
        <div className=' flex items-center gap-2'>
            <button className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md'>Add</button>
            <form method="dialog">
                <button type='submit' className=' btn btn-sm rounded-md'>Cancel</button>
            </form>
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
                            <Modal title={"Add featured!"} content={contentFeatured} btnOpenModal={"Add featured"} />
                            <div className=' grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                                {[0, 1, 2, 3].map((__, index) => (<div className=' flex items-center gap-3 justify-between p-2 bg-gray-100 w-full rounded-sm overflow-x-auto'>
                                    <div className=' flex items-center gap-3'>
                                        <img className='h-[50px] w-[50px] object-cover rounded-md' src="/banner_contact.png" alt="" />
                                        <p>Name Lorem, ipsum dolor.</p>{/* .substrin(0,10) */}
                                        <p>Href</p>{/* .substrin(0,10) */}
                                    </div>
                                    <div className=' flex items-center gap-2'>
                                        <button className=' btn btn-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white'><FaPen /></button>
                                        <button className=' btn btn-sm bg-red-600 hover:bg-red-700 rounded-md text-white'><FaTrash /></button>
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