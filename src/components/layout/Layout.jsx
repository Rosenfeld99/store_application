import React from 'react'

const Layout = () => {
    return (
        <div className=' relative'>
            <img src="/banner_layout.png" className='h-[100vw] max-h-[60vh] w-full object-cover' alt="" />
            <div className=' flex max-h-[60vh] bg-[#00000068] w-full h-[100vw] absolute top-0 right-0' />
            <div className=" flex flex-col gap-2 p-3 items-end justify-end px-3 sm:px-10 absolute sm:bottom-20 sm:right-20 right-5 bottom-40 bg-[#ffffff7f] rounded border-2 ">
                <h2 className=' font-bold text-xl md:text-2xl lg:text-3xl'>Welcome to PONPON jwelry</h2>
                <p>All of Jewelry for men's</p>
                <button className=' bg-black px-3 py-2 text-white rounded'>What New?</button>
            </div>
        </div>
    )
}

export default Layout