import React, { useEffect, useState } from 'react'
import { BtnsActions, ChooseActivity, Name } from '../../comps/prodForm'
import { useParams } from 'react-router-dom'
import { fetchAllProducts } from '../../../firebase/func'
import SelectProdSection from '../../comps/CatForm/SelectProdSection'
import { Modal } from '../../../utils/components'
import { addDoc, doc, serverTimestamp, collection as collectionFireBase, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import useCollection from '../../../hooks/useCollection'
import Collection from '../../comps/CatForm/Collection'

const CollectionAdminDetail = () => {
  const { fetchSingleCollection } = useCollection()
  const { id } = useParams()
  const [collection, setCollection] = useState({ name: "", activity: "", items: [] })
  const [newCollection, setNewCollection] = useState(collection || { name: "", activity: "", items: [] })
  const [isNewCollection, seIsNewCollection] = useState(id === "new")
  const [validateCollection, setValidateCollection] = useState(true)
  const [openModalCollection, setOpenModalCollection] = useState(false)

  const [prodList, setProdList] = useState([])
  useEffect(() => {
    fetchAllProducts(setProdList)
  }, [])

  useEffect(() => {
    !isNewCollection && fetchSingleCollection(id, setCollection, false)
  }, [id])

  useEffect(() => {
    !isNewCollection && setNewCollection(collection)
  }, [collection])

  useEffect(() => {
    setValidateCollection(collection?.activity === "" || collection?.name === "")
    console.log(collection);
  }, [collection])

  const initCollection = () => {
    seIsNewCollection(true)
    return setNewCollection(collection)
  }

  const handleDeleteProd = (idDel) => {
    const deleteProd = collection?.items?.filter((item) => item?.href !== idDel)
    setCollection({ ...collection, "items": deleteProd })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(collection);
    try {
      if (isNewCollection) {
        // Add a new document with a generated id.
        const docRef = await addDoc(collectionFireBase(db, "collections"), {
          ...collection,
          date: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } else {
        // Set the "capital" field of the city 'DC'
        const washingtonRef = doc(db, "collections", id);
        await updateDoc(washingtonRef, {
          ...collection
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
      <form onSubmit={handleSubmit}>
        {/* Btns Action */}
        <BtnsActions title={isNewCollection ? "New Collection" : "Edit Collection"} isDataValid={validateCollection} />
        <div className="space-y-12">
          <div className=" border-t border-gray-900/10 ">
            <div className="my-10 ">
              {/* collection name */}
              <Name placeHolder={"collection name"} keyName={"collectionName"} setState={setCollection} state={collection} />
            </div>
            {/* Product Modal select */}
            {/* <Modal initState={initCollection} open={openModalCollection} setOpen={setOpenModalCollection} title={isNewCollection ? "Add products!" : "Update products!"} content={<>
              <SelectProdSection handleToggelItemsState={handleToggelItemsItems} newState={newCollection} prodList={prodList} />
              <div className=' flex items-center gap-2 mt-3'>
                <button type='button' disabled={
                  newCollection?.items?.length === 0} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={() => { setCollection({ ...collection, "items": newCollection?.items }), setOpenModalCollection(false) }
                  }>{collection?.items?.length === 0 ? "Create" : "Update"}</button>
                <button type='button' onClick={() => {
                  setOpenModalCollection(false), initCollection()
                }} className=' btn btn-sm rounded-md'>Cancel</button>
              </div>
            </>} btnOpenModal={"Add products"} /> */}

            {/* Render products select */}
            {/* {collection?.items?.length > 0 && <div className=" grid grid-cols-1 my-5 bg-gray-100 py-5 rounded-sm max-w-sm shadow-md">
              <h3 className=' border-b px-5 pb-2 font-semibold'>Products</h3>
              {collection?.items?.map((item, index) => (
                <div className=" flex items-center justify-between px-5 py-2.5 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <p>{index + 1}.</p>
                    <img className=' w-10 h-10 object-cover rounded-md border-[1px] border-black' src={item?.imageSrc} alt={item?.imageAlt} />
                    <p className="label-text">{item?.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`${item?.activity === "active" ? " bg-green-300" : " bg-red-300"} py-0.5 px-1 rounded text-gray-600 text-sm`}>{item?.activity}</p>
                    <button
                      type='button'
                      onClick={() => { handleDeleteProd(item?.href) }}
                      className="btn btn-sm text-gray-600 btn-circle btn-ghost p-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>} */}
            <Collection initState={initCollection} open={openModalCollection} setOpen={setOpenModalCollection} title={isNewCollection ? "Add products!" : "Update products!"} content={<>
              <SelectProdSection handleToggelItemsState={handleToggelItemsItems} newState={newCollection} prodList={prodList} />
              <div className=' flex items-center gap-2 mt-3'>
                <button type='button' disabled={
                  newCollection?.items?.length === 0} className=' btn btn-sm bg-green-500 hover:bg-green-700 text-white rounded-md' onClick={() => { setCollection({ ...collection, "items": newCollection?.items }), setOpenModalCollection(false) }
                  }>{false ? "Add" : "Update"}</button>
                <button type='button' onClick={() => {
                  setOpenModalCollection(false), initCollection()
                }} className=' btn btn-sm rounded-md'>Cancel</button>
              </div>
            </>} state={collection} handleDeleteProd={handleDeleteProd}/>

            {/* Choose activity */}
            <ChooseActivity state={collection} setState={setCollection} type={"collection"} />
          </div>
        </div>
        {/* Btns Action */}
        <BtnsActions isDataValid={validateCollection} />
      </form>
    </div>
  )
}

export default CollectionAdminDetail