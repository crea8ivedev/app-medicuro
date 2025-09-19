import { cn } from '../utils/cn';

export default function AppointmentItem({
  date,
  doctor,
  service,
  buttons,
  day,
  time,
  showDayTime,
  id,
  buttonClasses,
  isLoading=false
}) {
  const dateArray = date?.split(' ')

  const dateOnly = [dateArray[0], dateArray[1]].join(' ') //without year
  const year = dateArray[2]

  return (
    <div className='bg-foam rounded-xl p-4 px-5 flex flex-col  lg:flex-row '>
      <div className='pe-4 flex flex-col appointment-date-div   text-center  h-full   text-xl font-semibold'>
        <div>{dateOnly}</div>
        <div>{year}</div>
      </div>

      <div className='flex  md:flex-nowrap md:flex-row flex-col  md:ps-4 md:justify-between md:items-center flex-1 md:border-l-2'>
        <div className='flex flex-col gap-3'>
          {showDayTime && (
            <div className=''>
              <div>{day}</div>
              <div className='leading-5'>{time}</div>
            </div>
          )}
          <div className=''>
            <div className='text-ocean font-semibold whitespace-break-spaces'>{doctor}</div>
            <div className='text-sm whitespace-break-spaces pe-1'>{service}</div>
          </div>
        </div>

        <div className='flex sm:flex-col items-center gap-2 my-3 md:my-0'>
          {buttons.map((item, index) => {
            return (
              <button
                disabled={isLoading}
                className={cn('btn-loader  bg-white py-1 px-2 md:min-w-[62px] rounded-md text-xs  cursor-pointer border appointment-btns',buttonClasses,isLoading ? "opacity-90 cursor-not-allowed" : "")}
                onClick={() => item.action(id)}
                key={index}
              >
                {item?.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
