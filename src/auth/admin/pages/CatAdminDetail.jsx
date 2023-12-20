import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { BtnsActions, ChooseActivity, Name } from '../../comps/prodForm';
import { Modal, Input, ImageUpload } from '../../../utils/components';
import { FaTrash, FaPen } from 'react-icons/fa6';

const CatAdminDetail = () => {
    const { id } = useParams()
    const [isNewCat, seIsNewCat] = useState(id === "new")
    const [isNewFeatured, setIsNewFeatured] = useState(true)
    const [category, setCategory] = useState({})
    const [featured, setFeatured] = useState(category?.featured || [])
    const [newFeatured, setNewFeatured] = useState({ href: "", name: "", imageSrc: "", imageAlt: "", id: Date.now() })
    const [open, setOpen] = useState(false)
    const [openModalSection, setOpenModalSection] = useState(false)
    const [sections, setSections] = useState(category?.sections || [])
    // console.log(isNewCat);
    // console.log(id);
    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "categories", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
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
        // console.log(category);
    }, [sections])

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
    const [newSection, setNewSection] = useState({ id: Date.now(), name: "", items: [] })
    const [isNewSection, setIsNewSection] = useState(true)
    const handleAddSection = () => {
        setSections([...sections, newSection])
        initSection()
        setOpenModalSection(false)
    }

    const contentFeatured = <>
        {/* featured Name */}
        <Input value={newFeatured?.name} setState={''} funcState={(e) => setNewFeatured({ ...newFeatured, "name": e.target.value })} placeholder={"Featured name"} label={"Name"} />
        {/* featured Href */}
        <Input value={newFeatured?.href} setState={''} funcState={(e) => setNewFeatured({ ...newFeatured, "href": e.target.value })} placeholder={"Featured href"} label={"Href"} />
        {/* featured ImageSrc & ImageAlt*/}
        <ImageUpload state={newFeatured} setState={setNewFeatured} />
        <div className=' flex items-center gap-2'>
            <button type='button' disabled={
                newFeatured?.name === "" || newFeatured?.imageSrc === "" ||
                newFeatured?.imageAlt === "" ||
                newFeatured?.href === ""} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={isNewFeatured ? () => handleAddFeatured() : () => handleUpdateFeatured()
                }>{isNewFeatured ? "Add" : "Update"}</button>
            <button type='button' onClick={() => {
                setOpen(false), initFeaturedObject()
            }} className=' btn btn-sm rounded-md'>Cancel</button>
        </div>
    </>

    const [prodList, setProdList] = useState([])
    const fetchData = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, name: doc.data()?.name, image: doc.data()?.images[0]?.src })
                // console.log(doc.id, " => ", doc.data());
            });
            setProdList(dataList)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
        // console.log(category?.sections && category?.sections?.items?.some((prod)=> prod?.href === prodList[0]?.id));
    }, [])
    // console.log(prodList);

    const handleToggelItemsSections = (prodItem) => {
        console.log(newSection);
        console.log(prodItem);
        const isItemExists = newSection?.items?.find((item) => item?.href == prodItem?.href)
        console.log(isItemExists);
        if (!isItemExists) {
            console.log("Add");
            const arrayItems = [...newSection?.items, prodItem]
            return setNewSection({ ...newSection, "items": arrayItems })
        } else {
            console.log("Delete");
            const deleteItem = newSection?.items?.filter((item) => item?.href !== prodItem?.href)
            return setNewSection({ ...newSection, "items": deleteItem })
        }
    }
    const initSection = () => {
        setIsNewSection(true)
        return setNewSection({ id: Date.now(), name: "", items: [] })
    }
    const handleDeleteSection = (sectionId) => {
        const sectionArray = sections?.filter((item) => item?.id !== sectionId)
        setSections(sectionArray)
    }
    const handleUpdateSection = () => {
        let updateArray = [...sections];
        for (let index = 0; index < sections?.length; index++) {
            if (sections[index]?.id === newSection?.id) {
                console.log(updateArray);
                updateArray[index] = {
                    ...updateArray[index],
                    name: newSection?.name,
                    items: newSection?.items
                };
            }
        }

        setSections(updateArray);
        initSection()
        setIsNewSection(true)
        setOpenModalSection(false)
    };
    console.log(newSection);
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
                            <Modal initState={initFeaturedObject} open={open} setOpen={setOpen} title={isNewFeatured ? "Add featured!" : "Update featured!"} content={contentFeatured} btnOpenModal={"Add featured"} />
                            <div className=' grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                                {featured?.map((item) => (<div key={item?.id} className=' flex items-center gap-3 justify-between p-2 bg-gray-100 w-full rounded-sm overflow-x-auto shadow-md'>
                                    <div className=' flex items-center gap-3'>
                                        <img className='h-[50px] w-[50px] object-cover rounded-md' src={item?.imageSrc} alt={item?.imageAlt} />
                                        <p>{item?.name?.substring(0, 10)}</p>
                                        <p>{item?.href?.substring(0, 10)}</p>
                                    </div>
                                    <div className=' flex items-center gap-2'>
                                        <button type='button' onClick={() => {
                                            setOpen(true)
                                            const singleFeatured = featured?.find((searchItem) => searchItem?.id === item?.id)
                                            setNewFeatured(singleFeatured)
                                            console.log(singleFeatured);
                                            setIsNewFeatured(false)
                                        }} className=' btn btn-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white'><FaPen /></button>
                                        <button type='button' onClick={() => { handleDeleteFeatured(item?.id) }} className=' btn btn-sm bg-red-600 hover:bg-red-700 rounded-md text-white'><FaTrash /></button>
                                    </div>
                                </div>))}
                            </div>
                            {/* Sections */}
                            <div className="my-5">
                                <Modal initState={initSection} open={openModalSection} setOpen={setOpenModalSection} title={isNewSection ? "Add section!" : "Update section!"} content={<>
                                    <Input value={newSection?.name} setState={''} funcState={(e) => setNewSection({ ...newSection, "name": e.target.value })} placeholder={"Section name"} label={"Name"} />
                                    <label className="block text-sm font-medium leading-6">
                                        Products
                                    </label>
                                    <div className=" flex flex-col gap-2 rounded-md overflow-x-auto h-full max-h-[180px] border-[1px] input-bordered">
                                        {prodList?.map((item) => (<div key={item?.id} className={`form-control ${newSection?.items?.some((x) => x?.href == item?.id) ? " bg-gray-100" : ""}`}>
                                            <label className="cursor-pointer flex items-center justify-between rounded-md py-1 px-2 w-full select-none hover:bg-gray-100">
                                                <div className=" flex items-center gap-4">
                                                    <img className=' w-10 h-10 object-cover rounded-md border-[1px] border-black' src={item?.image} alt="" />
                                                    <p className="label-text">{item?.name}</p>
                                                </div>
                                                <input type="checkbox"
                                                    onChange={() => handleToggelItemsSections({ href: item?.id, name: item?.name })}
                                                    checked={newSection?.items?.some((x) => x?.href == item?.id) ? true : false}
                                                    className="checkbox" />
                                            </label>
                                        </div>))}
                                    </div>
                                    <div className=' flex items-center gap-2 mt-3'>
                                        <button type='button' disabled={
                                            newSection?.name === "" || newSection?.items?.length === 0} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={isNewSection ? () => handleAddSection() : () => handleUpdateSection()
                                            }>{isNewSection ? "Add" : "Update"}</button>
                                        <button type='button' onClick={() => {
                                            setOpenModalSection(false), initSection()
                                        }} className=' btn btn-sm rounded-md'>Cancel</button>
                                    </div>
                                </>} btnOpenModal={"Add section"} />
                                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {category?.sections?.map((section) => (<div key={section?.id} className='w-full rounded-md overflow-hidden shadow-md'>
                                        <div className="flex items-center gap-3 justify-between bg-blue-300 p-2">
                                            {/* <div className=' flex items-center gap-3'> */}
                                            <h3 className=' text-lg font-semibold'>{section?.name?.substring(0, 12)}</h3>
                                            {/* <p>{item?.href?.substring(0, 10)}</p> */}
                                            {/* </div> */}
                                            <div className=' flex items-center gap-2'>
                                                <button type='button' onClick={() => {
                                                    setOpenModalSection(true)
                                                    const singleSection = sections?.find((searchItem) => searchItem?.id === section?.id)
                                                    setNewSection(singleSection)
                                                    console.log(singleSection);
                                                    setIsNewSection(false)
                                                }} className=' btn btn-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white'><FaPen /></button>
                                                <button type='button' onClick={() => { handleDeleteSection(section?.id) }} className=' btn btn-sm bg-red-600 hover:bg-red-700 rounded-md text-white'><FaTrash /></button>
                                            </div>
                                        </div>
                                        {/* Items */}
                                        <ul className='p-2 bg-gray-100 w-full h-[200px] overflow-x-auto'>{section?.items?.map((item, i) => (<li key={i}>({i + 1}<span className=' px-2'>{item?.name.substring(0, 15)}</span></li>))}</ul>
                                    </div>))}
                                </div>
                            </div>
                            {/* Choose Activity */}
                            <ChooseActivity state={category} setState={setCategory} type={"category"}/>
                        </div>
                    </div>

                </div>
                {/* Btns Action */}
                <BtnsActions />
            </form>
        </div>)
}

export default CatAdminDetail