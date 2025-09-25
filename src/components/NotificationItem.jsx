import { Trash2 } from 'lucide-react'
import axiosInstance from '../utils/axios'
import { cn } from '../utils/cn'
import { useState } from 'react'

export default function NotificationItem({
  date,
  title,
  desc,
  id,
  onDelete,
  deletable = true,
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const dateArray = date?.split(' ')

  const dateOnly = [dateArray[0], dateArray[1]].join(' ') //without year
  const year = dateArray[2]

  const deleteNotification = async () => {
    setIsDeleting(true)
    try {
      const response = await axiosInstance.post(
        '/api/v1/notifications/delete',
        { notificationId: id },
      )
      if (response.data?.statusCode == 200) {
        onDelete()
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={cn(
        'group min-h-[131px]  bg-foam rounded-xl p-4 flex flex-wrap relative overflow-hidden cursor-pointer hover:bg-teal-500',
        isDeleting && 'opacity-50',
      )}
    >
      {isDeleting && (
        <div className='absolute inset-0 flex items-center justify-center bg-white/80 z-10'>
          <img src='/spinner.gif' alt='Deleting...' className='w-8 h-8' />
        </div>
      )}
      <div className='pe-4 md:block flex gap-2  text-center  h-full  border-r-eal-800 text-xl'>
        <div className='font-bold'>{dateOnly}</div>
        <div className='font-bold'>{year}</div>
      </div>

      <div className='flex ps-4 justify-between  flex-1 border-l-2'>
        <div className='flex flex-col gap-3'>
          <div>
            <div className='text-ocean font-bold'>{title}</div>
            <div className='max-w-full whitespace-break-spaces font-semibold'>
              {desc}
            </div>
          </div>
        </div>

        {deletable && (
          <div
            onClick={() => !isDeleting && deleteNotification()}
            className={cn(
              ' absolute top-0   bg-black/80 h-full   text-white right-0 w-0 group-hover:w-100 transition-all flex flex-col gap-3 overflow-hidden items-center justify-center',
            )}
          >
            <Trash2 />
            <div>delete</div>
          </div>
        )}
      </div>
    </div>
  )
}
