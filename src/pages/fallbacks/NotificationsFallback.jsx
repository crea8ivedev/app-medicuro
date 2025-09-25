import React from 'react'

const NotificationsFallback = () => {
  return (
    <div className='bg-ocean min-h-screen w-full justify-between relative pb-0 animate-pulse'>
      <div className='common-bg absolute left-0'></div>

      {/* Back Button Skeleton */}
      <div className='px-4 py-5'>
        <div className='h-6 w-40 bg-gray-400 rounded'></div>
      </div>

      <div className='container mx-auto min-h-screen flex items-center md:pt-10 pt-2 justify-between relative custom-wrap md:px-10 px-3'>
        {/* Left Image Skeleton */}
        <div className='hidden md:block left-image w-[400px] h-[600px] bg-gray-300 rounded-xl'></div>

        <div className='right-container max-w-full w-full'>
          {/* Header Skeleton (counter + title) */}
          <div className='flex gap-3 items-center mt-4 justify-center lg:justify-start'>
            <div className='bg-gray-400 rounded-circle w-30 h-30 flex items-center justify-center'></div>
            <div className='h-4 w-32 bg-gray-400 rounded'></div>
          </div>

          <div className='flex gap-5 flex-wrap lg:flex-nowrap justify-center'>
            {/* Notifications Skeleton */}
            <div className='md:max-w-[470px] 2xl:max-w-500 w-full max-h-max rounded-xl'>
              <div className='flex flex-col gap-4 px-1'>
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className='bg-gray-300 h-20 w-full rounded-xl'
                  ></div>
                ))}
              </div>

              {/* Pagination dots */}
              <div className='flex justify-center gap-2 my-4'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='h-15 w-15 rounded-circle bg-gray-300'
                  ></div>
                ))}
              </div>
            </div>

            {/* Book Appointment Card Skeleton */}
            <div className='w-full grid place-content-center lg:place-content-start'>
              <div className='lg:flex flex-col md:flex-row bg-white gap-10 rounded-xl py-4 ps-5 pe-5 md:max-w-[470px] 2xl:max-w-500'>
                <div className='flex flex-col gap-2 items-center lg:items-start text-center lg:text-left'>
                  <div className='h-5 w-40 bg-gray-300 rounded'></div>
                  <div className='h-4 w-60 bg-gray-200 rounded'></div>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center bg-gray-300 p-5 rounded-md'>
                  <div className='w-10 h-10 bg-gray-400 rounded'></div>
                  <div className='h-3 w-20 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsFallback
