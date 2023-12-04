import React, { useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa';
import { TbListDetails } from "react-icons/tb";
import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firebase';

const TabelListUsers = () => {
  const [usersList, setUsersList] = useState([])
  const navigate = useNavigate()
  const fetchData = async () => {

    try {
      const dataList = []
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dataList.push({ id: doc.id, ...doc.data() })
        // console.log(doc.id, " => ", doc.data());
      });
      setUsersList(dataList)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (userId) => {
    if (confirm("Delete product.?")) {
      let filterData = usersList.filter((item) => item.id != userId)
      setUsersList(filterData)
      await deleteDoc(doc(db, "products", userId));
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  console.log(usersList);

  const classesIconTabel = 'text-xl flex items-center justify-center'
  return (
    <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
      <div className="flex items-center justify-between py-3" >
        <h2 className=' font-bold text-lg'>Users</h2>
        <button className=' btn btn-sm bg-gray-800 text-white rounded-md' onClick={() => navigate('/admin/users/new')}>Add User</button>
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
              <th>Display name</th>
              <th>Status</th>
              <th className={classesIconTabel}><TbListDetails /></th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody className='text-center'>
            {/* row 1 */}
            {usersList?.map((user, index) => (<tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </td>
              <td className=' capitalize'>
                {user?.displayName}
              </td>
              <td>
                <span className=' flex items-center gap-2 capitalize'>{user?.activity}
                  <div className="flex-none rounded-full bg-emerald-500/20 p-0.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${user?.activity === "active" ? "bg-emerald-500" : " bg-red-500"}`} />
                  </div>
                </span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
              <td>
                <samp>{user?.email}</samp>
              </td>
              <td>
                <span>{user?.role}</span>
              </td>
              <td className=' flex items-center gap-4 justify-center'>
                <button onClick={() => navigate(`/products/${product?.id}`)} className=' btn btn-sm border-green-700 bg-transparent text-green-700'>
                  View
                </button>
                <button onClick={() => deleteProduct(product?.id)} className=' btn btn-sm border-red-500 bg-transparent text-red-500'>
                  Delete
                </button>
                <button onClick={() => navigate(`/admin/products/${product?.id}`)} className=' btn btn-sm border-blue-500 bg-transparent text-blue-500'>
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

export default TabelListUsers