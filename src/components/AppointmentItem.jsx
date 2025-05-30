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
  buttonClasses
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

      <div className='flex md:flex-nowrap md:flex-row flex-col  ps-4 md:justify-between md:items-start flex-1 border-l-2'>
        <div className='flex flex-col gap-3'>
          {showDayTime && (
            <div className=''>
              <div>{day}</div>
              <div className='leading-5'>{time}</div>
            </div>
          )}
          <div className=''>
            <div className='text-ocean font-bold whitespace-break-spaces'>{doctor}</div>
            <div className='text-sm whitespace-break-spaces'>{service}</div>
          </div>
        </div>

        <div className='flex sm:flex-col gap-2 my-3 md:my-0'>
          {buttons.map((item, index) => {
            return (
              <button
                className={cn('bg-white px-2 rounded-xl  cursor-pointer',buttonClasses)}
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
