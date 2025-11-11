import { cn } from "../../../utils/cn"

const BookAppointmentItem = ({name,isFeesApply=false,isSelected=false,onClick=(id) => {},id,isInactive=false}) => {
    return <div onClick={() => !isInactive &&  onClick(id)} className={cn("relative h-100  text-center text-sm  rounded-md flex flex-col items-center justify-center font-semibold px-3 py-2",isSelected ? "bg-teal-400 hover:bg-teal-500" : "bg-foam hover:bg-[#7FD7CE]",isInactive ? "bg-[#72b3be] hover:bg-[#72b3be]" : "cursor-pointer")}>
        <div className="leading-4 font-[400]">{name}</div>
        {
            isFeesApply &&  <div className='absolute bottom-1 right-2   text-xl'> &#43;</div>
        }
        {
            isInactive && <div className="absolute left-2 bottom-1 text-xs text-white text-left !text-[#a4e8e1]"> temporarily <br></br>discontinued </div>
        }
   
    </div>
}


export default BookAppointmentItem