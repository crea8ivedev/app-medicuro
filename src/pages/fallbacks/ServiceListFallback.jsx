import React from "react";

function ServiceListFallback() {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-10 mb-10 animate-pulse">
        {/* Fees apply placeholder */}
        <div className="flex items-center gap-2">
         <div className='text-white flex font-bold gap-2 items-center'> <div className='text-xl'>&#43;</div> <div>fees apply</div></div>
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