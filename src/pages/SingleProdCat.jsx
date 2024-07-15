import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import useCollection from "../hooks/useCollection";

const products = [
    {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        colors: [1, 2, 3]
    },
    {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        colors: [1]
    },
    {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        colors: [1, 2]
    },
    {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '0B5OaEbTAzxv8ZM0AUmI',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        colors: [1, 2, 3]
    },
    // More products...
]

export default function SingleProdCat() {
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()
    const { singleCollection, fetchSingleCollection } = useCollection()
    useEffect(() => {
        fetchSingleCollection(id, false, true)
    }, [id])
    return (
        <div className="bg-white">
            <div className="  px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className=" text-xl font-semibold pb-8">Products by category + cat name</h2>
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 text-center">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    onClick={() => navigate(`/products/${product.href}`)}
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            {/*  */}
                            <div className=" flex items-center gap-2 justify-center pt-2">
                                {product?.colors.map((color, index) => (
                                    <div key={index} className={` w-5 h-5 rounded-full border ${index === 0 ? "bg-black" : index === 1 ? "bg-red-500" : "bg-orange-400"}`} />
                                ))}
                            </div>
                            {/*  */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
