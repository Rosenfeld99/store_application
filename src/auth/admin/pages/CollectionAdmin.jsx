import React, { useEffect } from 'react'
import useCollection from '../../../hooks/useCollection'
import { useNavigate } from 'react-router-dom'
import { FaImage } from 'react-icons/fa'
import { TbListDetails } from 'react-icons/tb'

const CollectionAdmin = () => {
  const { collectionList, fetchCollectionList } = useCollection()
  const navigate = useNavigate()
  useEffect(() => {
    fetchCollectionList()
  }, [])
  console.log(collectionList);
  const classesIconTabel = 'text-xl flex items-center justify-center'
  return (
    <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
      <div className="flex items-center justify-between py-3" >
        <h2 className=' font-bold text-lg'>collections</h2>
        <button className=' btn btn-sm bg-gray-800 text-white rounded-md' onClick={() => navigate('/admin/collections/new')}>Add collection</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-center'>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className={classesIconTabel}><FaImage /></th>
              <th>Name</th>
              <th>Status</th>
              <th>Length</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody className='text-center'>
            {/* render collections list */}
            {collectionList?.map((collection, index) => (<tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    {collection?.images && <img src={collection?.images[0]?.src} alt="Avatar Tailwind CSS Component" />}
                  </div>
                </div>
              </td>
              <td className=' capitalize'>
                {collection?.name.substring(0, 12)}{collection?.name.length >= 12 && "..."}
              </td>
              <td>
                <span className=' flex items-center gap-2 capitalize justify-center'>{collection?.activity}
                  <div className="flex-none rounded-full bg-emerald-500/20 p-0.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${collection?.activity === "active" ? "bg-emerald-500" : " bg-red-500"}`} />
                  </div>
                </span>
              </td>
              <td>
                <samp>
                  {collection?.items?.length}
                </samp>
              </td>
              <td className=' flex items-center gap-4 justify-center'>
                <button onClick={() => navigate(`/collections/${collection?.id}`)} className=' btn btn-sm border-green-700 bg-transparent text-green-700'>
                  View
                </button>
                <button onClick={() => deletecollection(collection?.id)} className=' btn btn-sm border-red-500 bg-transparent text-red-500'>
                  Delete
                </button>
                <button onClick={() => navigate(`/admin/collections/${collection?.id}`)} className=' btn btn-sm border-blue-500 bg-transparent text-blue-500'>
                  Edit
                </button>
              </td>


            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CollectionAdmin