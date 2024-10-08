import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'

const NavDesc = ({ navigation, classNames, open, }) => {
    const [catList, setCatList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "categories"),where("activity", "==", "active"));

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

    console.log(catList);
    return (
        <>
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                    {catList.map((category) => (
                        <Popover key={category.name} className="flex">
                            {({ open , close}) => (
                                <>
                                    <div className="relative flex">
                                        <Popover.Button
                                            className={classNames(
                                                open
                                                    ? 'border-white text-white'
                                                    : 'border-transparent text-white hover:text-gray-800',
                                                'relative z-10 -mb-px outline-none flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                            )}
                                        >
                                            {category.name}
                                        </Popover.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                            <div className="relative bg-white">
                                                <div className="mx-auto max-w-7xl px-8">
                                                    <div className={`grid gap-x-8 gap-y-10 py-16 ${category?.featured?.length == 0 || category?.sections?.length == 0 ? " grid-cols-1" : "grid-cols-2"}`}>
                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                            {category.featured?.slice(0,2).map((item) => (
                                                                <div key={item.name} onClick={()=>{navigate(`/products/${item.href}`),close()}} className="group relative text-base sm:text-sm">
                                                                    <div className="relative w-[100%] pb-[100%] aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                        <img
                                                                            src={item.imageSrc}
                                                                            alt={item.imageAlt}
                                                                            className="w-full h-full object-cover absolute"
                                                                        />
                                                                    </div>
                                                                    <p className="mt-6 block font-medium text-gray-900">
                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                        {item.name}
                                                                    </p>
                                                                    <p aria-hidden="true" className="mt-1">
                                                                        Shop now
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className={`row-start-1 ${category?.featured?.length == 0 ? ` flex flex-row gap-x-20 flex-wrap` : "grid grid-cols-3"} gap-x-8 gap-y-10 text-sm`}>
                                                            {category.sections.map((section) => (
                                                                <div key={section.name}>
                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                        {section.name}
                                                                    </p>
                                                                    <ul
                                                                        role="list"
                                                                        aria-labelledby={`${section.name}-heading`}
                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                    >
                                                                        {section.items.map((item) => (
                                                                            <li key={item.name} className="flex">
                                                                                <Link to={`/products/${item?.href}`} onClick={()=>close()} className="hover:text-gray-800">
                                                                                    {item.name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                        <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-white hover:text-gray-800"
                        >
                            {page.name}
                        </a>
                    ))}
                </div>
            </Popover.Group>
        </>
    )
}

export default NavDesc