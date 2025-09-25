function LoginFallback() {
  return (
    <div className="fixed inset-0    z-10 min-h-screen flex py-5 justify-around items-center">
      {/* Background placeholder */}
      <div className="plus-bg-banner animate-pulse"></div>

      <div className="flex flex-wrap container flex-container justify-between w-full">
        {/* Left side image placeholder */}
        <div className="flex invisible  left-img-container justify-between items-center">
          <div className="h-80 w-80 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Right side form placeholder */}
        <div className="bg-gray-100 py-24 md:px-24 px-5 sm:px-10 outline-40 outline-white rounded-xl w-full max-w-md animate-pulse">
          {/* Back Button */}
          <div className="h-6 w-16 bg-gray-200 rounded-md mb-4"></div>

          {/* Welcome text */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-3 w-64 bg-gray-200 rounded-md"></div>
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-5 mt-6">
            <div className="h-12 bg-gray-200 rounded-md"></div>
            <div className="h-12 bg-gray-200 rounded-md"></div>
          </div>

          {/* Forget password */}
          <div className="h-3 w-24 bg-gray-200 rounded-md mt-4 ml-auto"></div>

          {/* Button + Socials */}
          <div className="flex flex-col items-center gap-4 mt-7">
            <div className="h-12 w-full bg-gray-200 rounded-md"></div>
            <div className="h-3 w-20 bg-gray-200 rounded-md"></div>

            <div className="flex gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-3 w-40 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFallback;
