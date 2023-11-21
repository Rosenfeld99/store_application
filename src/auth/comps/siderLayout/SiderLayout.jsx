import React from 'react'
import {  FaCreditCard, FaHome, FaMedapps, FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import { FaChartSimple, FaShop } from "react-icons/fa6";

const dashboardOption = [
    { name: "dashboard", icon: <FaHome />, path: '/admin' },
    { name: "users", icon: <FaUsers />, path: '/admin/users' },
    { name: "products", icon: <FaShop />, path: '/admin/products' },
    { name: "categories", icon: <BiSolidCategory />, path: '/admin/categories' },
    { name: "orders", icon: <FaCreditCard />, path: '/admin/orders' },
    { name: "analytics", icon: <FaChartSimple />, path: '/admin/analytics' }, 
    { name: "logs", icon: <FaMedapps />, path: '/admin/logs' }, 
    { name: "settings", icon: <IoMdSettings />, path: '/admin/settings' },
]

const SiderLayout = () => {
    
    return (
        <div className=' flex w-full '>
            <div className='bg-[#464748] w-fit h-full text-white md:pt-0 pt-28 shadow-lg shadow-gray-500 fixed top-0 z-50'>
                <h2 className='p-5 font-bold text-2xl hidden md:flex'>Logo</h2>
                <ul className='px-3 md:px-5 flex flex-col md:gap-5 gap-10 pt-5'>
                    {dashboardOption.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <li className={` flex items-center gap-5 p-2 rounded text-xl hover:bg-[#5e5f60] ${item.name === 'settings' ? 'absolute bottom-5 w-fit pl-2 md:pr-7' : ''}`} key={item.path}>{item.icon} <span className=' text-lg opacity-70 hidden md:flex'>{item.name}</span></li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="w-full mx-auto max-w-7xl fixed top-0 z-50">
                <Nav />
                {/*  */}
                {/* <Dashboard/> */}
            </div>
        </div>
    )
}

export default SiderLayout