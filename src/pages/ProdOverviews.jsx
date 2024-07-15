import React, { useEffect } from 'react'
import { useState } from 'react'
import ImagesBox from '../components/products/ImagesBox'
import ColorsProd from '../components/products/ColorsProd'
import SizesProd from '../components/products/SizesProd'
import BreadCrumbs from '../utils/breadCrumbs/BreadCrumbs'
import ReviewsProd from '../components/products/ReviewsProd'
import ProdDetails from '../components/products/ProdDetails'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        {
            name: 'XXS', inStock: false, colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ]
        },
        { name: 'XS', inStock: true, },
        {
            name: 'S', inStock: true, colors: [
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            ]
        },
        {
            name: 'M', inStock: true, colors: [
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            ]
        },
        {
            name: 'L', inStock: true, colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },

            ]
        },
        {
            name: 'XL', inStock: true, colors: [
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ]
        },
        {
            name: '2XL', inStock: true, colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
            ]
        },
        {
            name: '3XL', inStock: true, colors: [
                { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
                { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            ]
        },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const ProdOverviews = () => {
    const { id } = useParams()
    const [product,setProduct] = useState({})
    const [selectedColor, setSelectedColor] = useState(product?.sizes && product?.sizes[0]?.colors[0])
    const [selectedSize, setSelectedSize] = useState(product?.sizes && product?.sizes[0])
    console.log(id);
    useEffect(() => {
        const fetchSingleData = async () => {
            const ref = doc(db, "products", id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                // Convert to City object
                setProduct(docSnap.data())
                console.log(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        id && fetchSingleData()
    }, [id])
    // console.log(selectedSize);
    return (
        <div className="bg-white">
            <div className="p-0 sm:p-4 lg:p-8 xl:p-3">
                {/* Breadcrombs */}
                <BreadCrumbs product={product} />
                <div className="gap-5 grid grid-cols-1 md:grid-cols-2">

                    {/* Image gallery */}
                    <ImagesBox product={product} />

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl flex flex-col gap-5 p-3 sm:p-0">
                        <div className="lg:col-span-2 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>

                        {/* Deacriptions */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

                            {/* Reviews */}
                            <ReviewsProd reviews={reviews} classNames={classNames} />

                            <form className="mt-10">
                                {/* Colors */}
                                <ColorsProd selectedSize={selectedSize} classNames={classNames} product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

                                {/* Sizes */}
                                <SizesProd classNames={classNames} selectedSize={selectedSize} setSelectedSize={setSelectedSize} product={product} />

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>


                    </div>

                </div>
                {/*  Details and highlights */}
                <ProdDetails product={product} />
            </div>
        </div>)
}

export default ProdOverviews