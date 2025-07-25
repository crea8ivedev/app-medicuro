 const SettingsFallback = () => {
  return (
    <div className='bg-sky-foam h-screen pb-16 relative animate-pulse'>
      <div className='common-bg absolute left-0 right-0'></div>

      <div className='flex flex-col p-5'>
        <div className='h-10 w-32 bg-gray-300 rounded'></div> {/* Back button placeholder */}
      </div>

      <div className='flex w-full justify-center items-center lg:mt-24'>
        <div className='bg-mint relative w-825 p-10 flex flex-col gap-7'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>

          <div className='my-10 flex flex-col gap-6'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className='flex items-center justify-between max-w-xs m-auto my-4'>
                <div className='flex gap-5 items-center'>
                  <div className='h-40 w-40 bg-gray-300 rounded-circle'></div>
                  <div className='h-6 w-32 bg-gray-300 rounded'></div>
                </div>
                <div className='h-6 w-6 bg-gray-300 rounded'></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsFallback