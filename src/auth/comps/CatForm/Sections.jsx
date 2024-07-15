import React, { useEffect, useState } from 'react'
import { Input, Modal } from '../../../utils/components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { FaPen, FaTrash } from 'react-icons/fa';
import { fetchAllProducts } from '../../../firebase/func';
import SelectProdSection from './SelectProdSection';

const Sections = ({ category, sections, setSections }) => {
    const [prodList, setProdList] = useState([])
    const [newSection, setNewSection] = useState({ id: Date.now(), name: "", items: [] })
    const [isNewSection, setIsNewSection] = useState(true)
    const [openModalSection, setOpenModalSection] = useState(false)

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
    const handleAddSection = () => {
        setSections([...sections, newSection])
        initSection()
        setOpenModalSection(false)
    }

    useEffect(() => {
        fetchAllProducts(setProdList)
    }, [])
    return (
        <div className="my-5">
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                sections
            </label>
            <Modal initState={initSection} open={openModalSection} setOpen={setOpenModalSection} title={isNewSection ? "Add section!" : "Update section!"} content={<>
                <Input value={newSection?.name} setState={''} funcState={(e) => setNewSection({ ...newSection, "name": e.target.value })} placeholder={"Section name"} label={"Name"} />
                <SelectProdSection handleToggelItemsState={handleToggelItemsSections} newState={newSection} prodList={prodList} />
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
    )
}

export default Sections