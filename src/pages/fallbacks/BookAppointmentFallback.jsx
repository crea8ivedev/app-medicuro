const BookAppointmentSkeleton = () => {
  return (
    <div className="bg-ice min-h-screen w-full justify-between relative animate-pulse">
      <div className="common-bg" />

      <div className="md:py-10 py-5 md:px-10 lg:ps-7 relative">
        <div className="md:mb-32 mb-5 px-2">
          <div className="h-10 w-48 bg-gray-300 rounded" />
        </div>

        <div className="flex items-center justify-around container m-auto">
          {/* Left Image Placeholder */}
          <div className="hidden md:block w-[300px] h-[300px] bg-gray-300 rounded-xl" />

          {/* Form Container */}
          <div className="bg-ocean md:px-10 md:py-16 p-5 md:rounded-xl w-[756px]">
            {/* Title & Description Placeholder */}
            <div className="text-white space-y-3 mb-10">
              <div className="h-6 w-64 bg-gray-400 rounded" />
              <div className="h-3 w-80 bg-gray-300 rounded" />
              <div className="h-3 w-72 bg-gray-300 rounded" />
            </div>

            {/* Service Grid */}
            <div className="flex flex-col gap-4 mt-10 mb-10">
              <div className="h-6 w-40 bg-gray-400 rounded" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 pe-4 md:pe-0">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded-md" />
                ))}
              </div>
            </div>

            {/* Button Placeholder */}
            <div className="md:text-end text-center">
              <div className="h-10 w-32 bg-gray-400 rounded-md inline-block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointmentSkeleton