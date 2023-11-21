import React from 'react'
import { FaImage } from 'react-icons/fa';
import { TbListDetails } from "react-icons/tb";

const ProdAdmin = () => {
    const classesIconTabel = 'text-xl flex items-center justify-center'
    return (
        <div className=' ml-28 md:ml-56 py-5'>
            <h2>Products</h2>

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
                            <th>Name & Categories</th>
                            <th>Status</th>
                            <th className={classesIconTabel}><TbListDetails /></th>
                            <th>In Stock</th>
                            <th>Orders</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {[1, 2, 3, 4, 5].map((__, index) => (<tr key={index}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/banner_layout.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                sets pigro silver
                                <br />
                                <span className="badge badge-ghost badge-sm">sets , bracelet , necklace</span>
                            </td>
                            <td>
                                <span className=' flex items-center gap-2'>Active
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-0.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                </span>
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                            <td>
                                <samp>1,000</samp>
                            </td>
                            <td>
                                <span>5</span>
                            </td>
                            <td className=' flex items-center gap-4 justify-center'>
                                <button className=' btn btn-sm border-green-700 bg-transparent text-green-700'>
                                    View
                                </button>
                                <button className=' btn btn-sm border-red-500 bg-transparent text-red-500'>
                                    Delete
                                </button>
                                <button className=' btn btn-sm border-blue-500 bg-transparent text-blue-500'>
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

export default ProdAdmin