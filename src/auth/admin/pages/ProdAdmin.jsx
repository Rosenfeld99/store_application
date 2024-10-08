import React, { useEffect } from 'react'
import { FaImage } from 'react-icons/fa';
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import useProduct from '../../../hooks/useProduct';

const ProdAdmin = () => {
    const {productList,setProductList,fetchProductList,deleteProduct} = useProduct()
    const navigate = useNavigate()

    useEffect(() => {
        fetchProductList()
    }, [])
    console.log(productList);

    const classesIconTabel = 'text-xl flex items-center justify-center'
    return (
        <div className=' ml-16 md:ml-44 px-5 py-20 md:px-10 md:py-28'>
            <div className="flex items-center justify-between py-3" >
                <h2 className=' font-bold text-lg'>Products</h2>
                <button className=' btn btn-sm bg-gray-800 text-white rounded-md' onClick={() => navigate('/admin/products/new')}>Add product</button>
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
                            <th>In Stock</th>
                            <th>Orders</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* render products list */}
                        {productList?.map((product, index) => (<tr key={index}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        {product?.images && <img src={product?.images[0]?.src} alt="Avatar Tailwind CSS Component" />}
                                    </div>
                                </div>
                            </td>
                            <td className=' capitalize'>
                                {product?.name.substring(0, 12)}{product?.name.length >= 12 && "..."}
                            </td>
                            <td>
                                <span className=' flex items-center gap-2 capitalize'>{product?.activity}
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-0.5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${product?.activity === "active" ? "bg-emerald-500" : " bg-red-500"}`} />
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

export default ProdAdmin