import { Fragment, useContext, useState } from 'react'
import { Dialog, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import NavMobile from './mobile/NavMobile'
import NavDesc from './desc/NavDesc'
import AuthAndCurrency from './desc/AuthAndCurrency'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase'


const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [open, setOpen] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()

    const handleSignOut = async (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
    return (
        <>
            {path !== '/register' && path !== '/login' ? <div className="bg-white sticky z-50 top-0">
                {/* Mobile menu */}
                <NavMobile navigation={navigation} open={open} setOpen={setOpen} classNames={classNames} />

                <header className="relative bg-[#464748]">
                    <AuthAndCurrency />

                    <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex lg:hidden">
                                    <button
                                        type="button"
                                        className="relative rounded-md bg-transparent p-2 text-white "
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="absolute -inset-0.5 " />
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    {/* Search */}
                                    <div className="flex">
                                        <a href="#" className="p-2 text-white hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>


                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0 items-center">
                                    <a href="#">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                            // src="/logo_white.png"
                                            alt=""
                                        />
                                    </a>
                                    {/* Search */}
                                    <div className="lg:flex hidden">
                                        <a href="#" className="p-2 text-white hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>

                                {/* Flyout menus */}
                                <NavDesc classNames={classNames} navigation={navigation} open={open} />

                                <div className="flex items-center">
                                    {/* Auth and currency ctrl */}
                                    {/* <AuthAndCurrency/> */}

                                    {/* Profile image */}
                                    {currentUser &&
                                        <Menu as="div" className="relative flex">
                                            <Menu.Button>
                                                <div className=''>
                                                    <img className='h-8 w-8 object-cover rounded-full' src="/sets_pigro_silver.png" alt="" />
                                                </div>
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    // href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    Your profile
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <div onClick={handleSignOut}>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        // type="submit"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block w-full px-4 py-2 text-left text-sm'
                                                                        )}
                                                                    >
                                                                        Sign out
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>}

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <a href="#" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">0</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
                </header>
            </div> : null}
        </>
    )
}