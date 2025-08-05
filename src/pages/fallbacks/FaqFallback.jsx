function FaqFallback() {
  return (
    <div className="animate-pulse">
      {/* Simulating 4 FAQ items */}
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="my-3">
          {/* Question row */}
          <div className="flex items-center justify-between bg-ice py-3 px-4 rounded-xl">
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FaqFallback;