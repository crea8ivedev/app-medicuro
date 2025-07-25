const NotificationsFallback = () => {
  return (
    <div className="bg-ocean min-h-screen w-full justify-between relative pb-10 animate-pulse">
      <div className="common-bg absolute left-0"></div>

      <div className="container mx-auto min-h-screen flex items-center justify-between relative custom-wrap md:px-10 px-3">
        {/* Left Image Skeleton */}
        <div className="hidden md:block left-image w-[400px] h-[600px] bg-gray-300 rounded-xl"></div>

        <div className="right-container max-w-full w-full">
          {/* Header Skeleton */}
          <div className="flex gap-3 items-center mt-4">
            <div className="text-black bg-gray-400 font-semibold rounded-circle w-30 h-30 flex items-center justify-center"></div>
            <div className="text-white my-4 h-4 w-32 bg-gray-400 rounded"></div>
          </div>

          <div className="flex gap-5 flex-wrap lg:flex-nowrap">
            {/* Notifications Skeleton */}
            <div className="md:min-w-500 md:max-w-500 w-full max-h-max rounded-xl">
              <div className="flex flex-col gap-4 px-1">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="bg-gray-300 h-20 w-full rounded-xl"></div>
                ))}
              </div>

              <div className="flex justify-center gap-2 my-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-15 w-15 rounded-circle bg-gray-300"></div>
                ))}
              </div>
            </div>

            {/* Book Appointment Card Skeleton */}
            <div className="w-full">
              <div className="flex w-full md:flex-nowrap flex-wrap-reverse items-center justify-center xl:min-w-500 md:max-w-500 bg-white gap-5 rounded-xl px-7 py-4">
                <div className="flex flex-col items-center md:items-start justify-center gap-2">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="h-3 w-60 bg-gray-200 rounded"></div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center bg-gray-300 p-5 rounded-md">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                  <div className="text-sm h-3 w-20 bg-gray-200 rounded"></div>
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