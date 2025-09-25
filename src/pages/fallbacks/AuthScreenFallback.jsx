import React from 'react'

function AuthScreenFallback() {
  return (
<div
  role="status"
  className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-teal-300 to-blue-600 animate-pulse"
>
  <div className="flex flex-col items-center text-center space-y-6 max-w-sm w-full">

    {/* Logo */}
    <div className="w-[100px] h-[100px] bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>

    {/* Title */}
    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>

    {/* Subtitle */}
    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>

    {/* Paragraph */}
    <div className="space-y-2 mt-4 flex flex-col items-center">
      <div className="h-2.5 w-72 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-2.5 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-2.5 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col gap-4 mt-7 w-full items-center">
      <div className="h-10 w-50 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-10 w-50 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>

    <span className="sr-only">Loading...</span>
  </div>
</div>


  )
}

export default AuthScreenFallback