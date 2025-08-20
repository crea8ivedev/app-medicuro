
function SignupTermsFallback() {
  return (
    <div className="min-h-screen py-20 flex flex-col relative items-center z-100">
      {/* Background Placeholder */}
      <div className="plus-bg-banner -z-10 animate-pulse"></div>

      <div className="flex flex-container justify-between container flex-wrap w-full">
        {/* Left side illustration placeholder */}
        <div className="flex invisible left-img-container justify-between items-center">
          <div className="h-80 w-80 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Right side card */}
        <div className="bg-gray-100 md:mt-24 md:pt-24 mx-4 px-5 sm:px-10 md:py-7 py-10 w-500 rounded-xl outline-40 outline-white animate-pulse">
          {/* Back button placeholder */}
          <div className="h-6 w-20 bg-gray-200 rounded-md mb-4"></div>

          <div className="mt-4 mb-7 px-3 md:px-[50px]">
            {/* Terms fallback */}
            <div className="mb-5 text-center flex flex-col gap-2">
              <div className="h-4 w-60 bg-gray-200 mx-auto rounded-md"></div>
              <div className="h-4 w-40 bg-gray-200 mx-auto rounded-md"></div>
              <div className="flex justify-center gap-2">
                <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
              </div>
            </div>

            <div className="space-y-3 mt-14">
              <div className="h-3 w-full bg-gray-200 rounded-md"></div>
              <div className="h-3 w-11/12 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-10/12 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-9/12 bg-gray-200 rounded-md"></div>
            </div>

            <div className="space-y-3 mt-6">
              <div className="h-3 w-full bg-gray-200 rounded-md"></div>
              <div className="h-3 w-11/12 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-10/12 bg-gray-200 rounded-md"></div>
              <div className="h-3 w-9/12 bg-gray-200 rounded-md"></div>
            </div>

            <div className="my-6 mx-3">
              <div className="h-5 w-40 bg-gray-200 rounded-md"></div>
            </div>

            <ul className="mx-3 ">
              <li className="h-3 w-full bg-gray-200 rounded-md"></li>
              <li className="h-3 w-10/12 bg-gray-200 rounded-md mt-2"></li>
              <li className="h-3 w-9/12 bg-gray-200 rounded-md mt-2"></li>
            </ul>

            <div className="text-center mt-6">
              <div className="h-12 w-full md:w-40 bg-gray-200 rounded-md mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupTermsFallback;
