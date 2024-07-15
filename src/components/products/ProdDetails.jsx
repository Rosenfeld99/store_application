import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProdDetails = ({ product }) => {
  const [toggelHighlights, setToggelHighlights] = useState(false)
  const [toggelDetails, setToggelDetails] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [])
  return (
    <div className="mt-10 py-10 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 lg:pb-16 lg:pt-6 p-3 sm:p-0">
      <div>

        {/* Highlights */}
        <div className="border-t-2 py-7">
          <h3 onClick={() => setToggelHighlights(!toggelHighlights)} className={`text-sm font-medium text-gray-900 flex items-center justify-between ${toggelHighlights && " text-indigo-500"}`}>Highlights {!toggelHighlights ? <PlusIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> :
            <MinusIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />}</h3>

          {toggelHighlights && <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="text-gray-400">
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>}
        </div>

        {/* Deails */}
        <div className="border-t-2 py-7">
          <h2 onClick={() => setToggelDetails(!toggelDetails)} className={`text-sm font-medium text-gray-900 flex items-center justify-between ${toggelDetails && " text-indigo-500"}`}>Details
            {!toggelDetails ? <PlusIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> :
              <MinusIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />}
          </h2>

          {toggelDetails && <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">{product.details}</p>
          </div>}
        </div>
      </div>
      <div className="">
        <h4>Based on 117 reviews</h4>
        <div className='flex flex-col'>
          {[1, 2, 3, 4].map((item, i) => (
            <div key={i} className=' border-b-2 py-10 space-y-3'>
              <div className=' flex items-center gap-4'>
                <div className="">
                  <img className='w-10 h-10 rounded-full' src="/sets_worker_silver.png" alt="" />
                </div>
                <div className='flex-col'>
                  <p className=" font-bold">userMe</p>
                  5 stars
                </div>
              </div>
              <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos excepturi in laboriosam ab totam sequi eius nisi ullam nemo! Fugit, iste! Veniam illum, repellendus temporibus esse natus velit voluptas! Sunt adipisci odit quam cupiditate sequi?</div>
            </div>
          ))}
        </div>
      </div>
    </div>)
}

export default ProdDetails