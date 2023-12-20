import React, { useEffect, useState } from 'react'
import { FaImage } from 'react-icons/fa';
import { TbListDetails } from "react-icons/tb";
import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const CatAdmin = () => {
    const [catList, setCatList] = useState([])
    const navigate = useNavigate()
    const fetchData = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "categories"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, ...doc.data() })
                // console.log(doc.id, " => ", doc.data());
            });
            setCatList(dataList)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCategory = async (catId) => {
        if (confirm("Delete category.?")) {
            let filterData = catList.filter((item) => item.id != catId)
            setCatList(filterData)
            await deleteDoc(doc(db, "categories", catId));
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    console.log(catList);

    const classesIconTabel = 'text-xl flex items-center justify-center'
    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <div className="flex items-center justify-between py-3" >
                <h2 className=' font-bold text-lg'>Categories</h2>
                <button className=' btn btn-sm bg-gray-800 text-white rounded-md' onClick={() => navigate('/admin/categories/new')}>Add category</button>
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
                            <th className={classesIconTabel}><TbListDetails /></th>
                            <th>Featureds</th>
                            <th>Sections</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {catList?.map((category, index) => (<tr key={index}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        {category?.featured[0]?.imageSrc && <img src={category?.featured[0]?.imageSrc} alt="Avatar Tailwind CSS Component" />}
                                    </div>
                                </div>
                            </td>
                            <td className=' capitalize font-semibold'>
                                {category?.name}
                            </td>
                            <td>
                                <span className=' flex items-center gap-2 capitalize'>{category?.activity}
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-0.5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${category?.activity === "active" ? "bg-emerald-500" : " bg-red-500"}`} />
                                    </div>
                                </span>
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                            <td>
                                <samp>
                                    {category?.featured?.slice(0, 3).map((featuredItem, i) => (
                                        <span key={i} className="badge badge-ghost badge-sm">
                                            {featuredItem?.name}
                                            {i + 1 !== Math.min(3, category?.featured?.length) ? "," : ""}
                                        </span>
                                    ))}
                                    {category?.featured?.length > 3 && <span className="badge badge-ghost badge-sm">...</span>}
                                </samp>
                            </td>
                            <td>
                                <samp>
                                    {category?.sections?.slice(0, 3).map((sectionItem, i) => (
                                        <span key={i} className="badge badge-ghost badge-sm">
                                            {sectionItem?.name}
                                            {i + 1 !== Math.min(3, category?.featured?.length) ? "," : ""}
                                        </span>
                                    ))}
                                    {category?.featured?.length > 3 && <span className="badge badge-ghost badge-sm">...</span>}
                                </samp>                            </td>
                            <td className=' flex items-center gap-4 justify-center'>
                                <button onClick={() => navigate(`/categories/${category?.id}`)} className=' btn btn-sm border-green-700 bg-transparent text-green-700'>
                                    View
                                </button>
                                <button onClick={() => deleteCategory(category?.id)} className=' btn btn-sm border-red-500 bg-transparent text-red-500'>
                                    Delete
                                </button>
                                <button onClick={() => navigate(`/admin/categories/${category?.id}`)} className=' btn btn-sm border-blue-500 bg-transparent text-blue-500'>
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

export default CatAdmin