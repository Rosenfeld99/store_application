import React, { useState } from 'react'
import { ImageUpload, Input, Modal } from '../../../utils/components'
import { FaPen, FaTrash } from 'react-icons/fa'
import SelectProd from '../../../utils/SelectProd/SelectProd'

const Featured = ({ setFeatured, featured }) => {
  const [newFeatured, setNewFeatured] = useState({ href: "", name: "", imageSrc: "", imageAlt: "", id: Date.now() })
  const [isNewFeatured, setIsNewFeatured] = useState(true)
  const [open, setOpen] = useState(false)
  console.log(newFeatured);

  const contentFeatured = <>
    <SelectProd open={open} funcState={(newSelected) => setNewFeatured({ href: newSelected?.id, name: newSelected?.name, imageSrc: newSelected?.imageSrc, imageAlt: newSelected?.imageAlt })} />
    <div className="divider w-56 mx-auto">OR</div>
    {/* featured Name */}
    <Input value={newFeatured?.name} funcState={(e) => setNewFeatured({ ...newFeatured, "name": e.target.value })} placeholder={"Featured name"} label={"Name"} />
    {/* featured Href */}
    <Input value={newFeatured?.href} funcState={(e) => setNewFeatured({ ...newFeatured, "href": e.target.value })} placeholder={"Featured href"} label={"Href"} />
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
  const initFeaturedObject = () => {
    setIsNewFeatured(true)
    return setNewFeatured({ href: "", name: "", imageSrc: "", imageAlt: "", id: Date.now() })
  }

  const handleAddFeatured = () => {
    setFeatured([...featured, newFeatured])
    initFeaturedObject()
    setOpen(false)
  }

  const handleDeleteFeatured = (featuredId) => {
    console.log(featured);
    console.log(featuredId);
    const filteredArray = featured?.filter((item) => item?.href !== featuredId)
    console.log(filteredArray);
    setFeatured(filteredArray)
  }
  const handleUpdateFeatured = () => {
    let updateArray = [...featured];
    for (let index = 0; index < featured?.length; index++) {
      if (featured[index]?.href === newFeatured?.href) {
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
  return (
    <div>
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
            <button type='button' onClick={() => { handleDeleteFeatured(item?.href) }} className=' btn btn-sm bg-red-600 hover:bg-red-700 rounded-md text-white'><FaTrash /></button>
          </div>
        </div>))}
      </div>
    </div>
  )
}

export default Featured