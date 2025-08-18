import React from "react";

function ServiceListFallback() {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-10 mb-10 animate-pulse">
        {/* Fees apply placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>

        {/* Service grid placeholders */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 pe-4 md:pe-0">
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* Next button placeholder */}
     
    </div>
  );
}

export default ServiceListFallback;