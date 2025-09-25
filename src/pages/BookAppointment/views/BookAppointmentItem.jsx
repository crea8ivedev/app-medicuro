import { cn } from '../../../utils/cn'

const BookAppointmentItem = ({
  name,
  isFeesApply = false,
  isSelected = false,
  onClick = (id) => {},
  id,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'relative h-24 md:h-24 lg:h-100 cursor-pointer text-center text-sm  rounded-md flex flex-col items-center justify-center font-semibold px-3 py-2',
        isSelected
          ? 'bg-teal-400 hover:bg-teal-500'
          : 'bg-foam hover:bg-[#7FD7CE]',
      )}
    >
      <div className='leading-4 font-[400] line-clamp-2 break-words whitespace-normal'>
        {name}
      </div>
      {isFeesApply && (
        <div className='absolute bottom-1 right-2   text-xl'> &#43;</div>
      )}
    </div>
  )
}

export default BookAppointmentItem
