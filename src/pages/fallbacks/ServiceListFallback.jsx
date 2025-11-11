import React, { useEffect, useState } from 'react'

function ServiceListFallback() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 400)
  }, [])

  const arrayLength = isMobile ? 4 : 16

  return (
    <div>
      <div className='flex flex-col gap-4 mt-10 mb-10 animate-pulse'>
        {/* Fees apply placeholder */}
        <div className='flex items-center gap-2'>
          <div className='text-white flex font-bold gap-2 items-center'>
            <div className='text-xl'>*</div> <div>fees apply</div>
          </div>
        </div>

        {/* Service grid placeholders */}
        <div className='flex  flex-col justify-center items-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 pe-4 md:pe-0'>
          {[...Array(arrayLength)].map((_, i) => (
            <div
              key={i}
              className='h-24 md:h-16 w-80 md:w-auto bg-gray-200 rounded-md'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceListFallback
