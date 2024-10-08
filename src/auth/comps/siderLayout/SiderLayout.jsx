import React from 'react'
import { FaCreditCard, FaHome, FaMedapps, FaUsers } from "react-icons/fa";
import { BiSolidCarousel, BiSolidCategory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import Nav from '../nav/Nav';
import { FaChartSimple, FaShop, FaTag } from "react-icons/fa6";

const dashboardOption = [
    { name: "dashboard", icon: <FaHome />, path: '/admin' },
    { name: "users", icon: <FaUsers />, path: '/admin/users' },
    { name: "products", icon: <FaTag />, path: '/admin/products' },
    { name: "categories", icon: <BiSolidCategory />, path: '/admin/categories' },
    { name: "collections", icon: <BiSolidCarousel />, path: '/admin/collections' },
    { name: "orders", icon: <FaCreditCard />, path: '/admin/orders' },
    { name: "analytics", icon: <FaChartSimple />, path: '/admin/analytics' },
    { name: "logs", icon: <FaMedapps />, path: '/admin/logs' },
    { name: "store", icon: <FaShop />, path: '/' },
    { name: "settings", icon: <IoMdSettings />, path: '/admin/settings' },
]

const SiderLayout = () => {
    const location = useLocation()
    const pathSegments = location.pathname.split('/');
    const currentSection = pathSegments[2] || 'dashboard';
    console.log(currentSection);
    return (
        <div className=' flex w-full '>
            <div className='bg-[#464748] w-fit h-full text-white md:pt-0 pt-28 fixed top-0 z-50'>
                <h2 className='p-5 font-bold text-2xl hidden md:flex'>Logo</h2>
                <ul className='px-3 md:px-5 flex flex-col md:gap-3 gap-10 pt-5 relative '>
                    {dashboardOption.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <li className={` capitalize flex items-center gap-5 p-2 rounded text-xl hover:bg-[#5e5f60] ${currentSection == item?.name ? "bg-[#5e5f60]" : ""} ${item.name === 'settings' ? ' fixed bottom-0 pl-2 md:pr-8 bg-[#464748] w-fit' : ''}`} key={item.path}>{item.icon} <span className=' text-lg opacity-70 hidden md:flex'>{item.name}</span></li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="w-full mx-auto max-w-7xl fixed top-0 md:z-40 z-50">
                <Nav />
                {/*  */}
                {/* <Dashboard/> */}
            </div>
        </div>
    )
}

export default SiderLayout