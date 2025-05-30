import { cn } from '../utils/cn';
import deleteIcon from "../assets/images/delete.png"
import axiosInstance from '../utils/axios';


export default function NotificationItem({
  date,
  title,
  desc,
  id,
  onDelete
}) {
  const dateArray = date?.split(' ')

  const dateOnly = [dateArray[0], dateArray[1]].join(' ') //without year
  const year = dateArray[2]

  const deleteNotification = async () => {
     const response = await axiosInstance.post("/api/v1/notifications/delete",{notificationId:id})
     if(response.data?.statusCode == 200){
      onDelete()
     }
  }

  return (
    <div className='group  bg-foam rounded-xl p-4 flex flex-wrap relative overflow-hidden cursor-pointer hover:bg-teal-500'>
      <div className='pe-4 md:block flex gap-2  text-center  h-full  border-r-eal-800 text-xl'>
        <div className='font-bold'>{dateOnly}</div>
        <div className='font-bold'>{year}</div>
      </div>

      <div className='flex ps-4 justify-between items-center flex-1 border-l-2'>
        <div className='flex flex-col gap-3'>
          <div>
            <div className='text-ocean font-bold'>{title}</div>
            <div className='max-w-full whitespace-break-spaces font-semibold'>{desc}</div>
          </div>
        </div>

        <div onClick={() => deleteNotification()} className='absolute   bg-black/80 h-full   text-white right-0 w-0 group-hover:w-100 transition-all flex flex-col gap-3 overflow-hidden items-center justify-center '> 
          <img src={deleteIcon} alt="" />
          <div>delete</div>
        </div>
      </div>
    </div>
  )
}
