import React, { useState } from 'react'

const ImagesBox = ({ product }) => {
    const [currentImage, setCurrentImage] = useState({ src: product.images[0].src, alt: product.images[0].alt })
    return (
        <div className="sm:px-6 flex flex-col gap-5 lg:gap-8 p-5 lg:p-8">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="flex items-center gap-5 lg:gap-8">
                {product?.images?.map((img, i) => (
                    <div className={`"" ${currentImage.src === img.src ? " border-2 border-[#464748] overflow-hidden rounded-lg" : "overflow-hidden rounded-lg"}`} >
                        <img onClick={(e) => setCurrentImage({ src: e.target.getAttribute('src'), alt: e.target.getAttribute('alt') })}
                            src={img.src}
                            alt={img.alt}
                            key={i}
                            className=" min-w-[70px] min-h-[70px] max-w-[100px] max-h-[100px] w-[5vw] h-[5vw] object-cover object-center"
                        />
                    </div>
                ))}
            </div>
        </div>)
}

export default ImagesBox