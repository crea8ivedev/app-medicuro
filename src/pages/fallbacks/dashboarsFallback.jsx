
const DashboardFallback = () => {
  return (
    <div className="bg-ice px-3 py-5 md:py-0 min-h-screen w-full relative animate-pulse">
      {/* Background Shape */}
      <div className="common-bg absolute left-0 bottom-100 bg-bottom"></div>

      {/* Main Content */}
      <div className="container mx-auto md:py-24 flex flex-col gap-6 xl:flex-row items-start relative md:px-5">
        {/* Left Image Placeholder (loginSideImg) */}
        <div className="hidden xl:block w-[200px] h-[300px] bg-gray-300 rounded-lg"></div>

        <div className="w-full">
          {/* Header Card */}
          <div className="flex flex-col md:flex-row bg-white gap-10 rounded-xl py-4 ps-10 pe-5 lg:w-lg ms-auto mb-6">
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-5 w-40 bg-blue-200 rounded" />
              <div className="h-4 w-72 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-col gap-1 justify-center items-center bg-teal p-4 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-full" />
              <div className="h-3 w-16 bg-white rounded mt-1" />
            </div>
          </div>

          {/* Main Appointment Grid */}
          <div className="flex flex-col xl:flex-row gap-4">
            {/* Upcoming Appointments */}
            <div className="bg-teal p-5 pb-6 rounded-xl lg:w-lg flex-1 min-h-[360px]">
              <div className="h-6 w-48 bg-white rounded mb-6" />

              {/* Two fake cards per slide */}
              <div className="flex flex-col gap-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg flex flex-col gap-2">
                    <div className="h-4 w-36 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 my-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="h-[15px] w-[15px] rounded-full bg-white" />
                ))}
              </div>
            </div>

            {/* Past Appointments */}
            <div className="bg-ocean p-5 pb-6 rounded-xl lg:w-lg flex-1 min-h-[360px]">
              <div className="h-6 w-48 bg-white rounded mb-6" />

              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg flex flex-col gap-2">
                    <div className="h-4 w-36 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 my-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="h-[15px] w-[15px] rounded-full bg-white" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardFallback
