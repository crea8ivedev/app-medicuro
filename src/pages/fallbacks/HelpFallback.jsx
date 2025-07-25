const helpFallback = () => {
    return  <div className='bg-sky-foam h-screen pb-16 relative'>
  <div className='common-bg absolute left-0 right-0'></div>

  <div className='flex flex-col p-5'>
    <div className='skeleton w-32 h-8 rounded-md'></div>
  </div>

  <div className='flex w-full justify-center items-center md:mt-24'>
    <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 pb-36'>
      <div className='common-right-design z-10 bottom-5 right-5'></div>

      <div className='my-10 flex flex-col gap-5'>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className='flex items-center justify-between max-w-xs m-auto my-4 cursor-pointer'
          >
            <div className='flex gap-5 items-center'>
              <div className='h-40 w-40 flex items-center justify-center rounded-circle skeleton'></div>
              <div className='skeleton h-5 w-32 rounded-md'></div>
            </div>
            <div className='skeleton h-5 w-5 rounded-md'></div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div> 
}

export default helpFallback