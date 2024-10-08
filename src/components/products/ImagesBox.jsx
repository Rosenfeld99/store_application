import React, { useEffect, useState } from 'react'

const ImagesBox = ({ product }) => {
    const [currentImage, setCurrentImage] = useState({})
    useEffect(() => {
        product?.images && (
            setCurrentImage({ src: product?.images[0].src, alt: product?.images[0].alt }),
            console.log("run..."));
    }, [product])

    return (
        <div className="flex flex-col gap-5 lg:gap-8">
            <div className="sm:overflow-hidden sm:rounded-lg relative w-full pt-[100%]">
                <img
                    src={currentImage?.src}
                    alt={currentImage?.alt}
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </div>
            <div className="flex items-center gap-5 lg:gap-8 px-3 sm:px-0">
                {product?.images?.map((img, i) => (
                    <div key={i} className={`"" ${currentImage?.src === img?.src ? " border-2 border-[#464748] overflow-hidden rounded-lg" : "overflow-hidden rounded-lg"}`} >
                        <img onClick={(e) => setCurrentImage({ src: e.target.getAttribute('src'), alt: e.target.getAttribute('alt') })}
                            src={img?.src}
                            alt={img?.alt}
                            key={i}
                            className=" min-w-[70px] min-h-[70px] max-w-[100px] max-h-[100px] w-[5vw] h-[5vw] object-cover object-center"
                        />
                    </div>
                ))}
            </div>
        </div>)
}

export default ImagesBox