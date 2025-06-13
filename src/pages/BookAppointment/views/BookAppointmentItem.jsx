import { cn } from "../../../utils/cn"

const BookAppointmentItem = ({name,isFeesApply=false,isSelected=false,onClick=(id) => {},id}) => {
    return <div onClick={() => onClick(id)} className={cn("relative h-100 cursor-pointer text-center text-sm  rounded-md flex flex-col items-center justify-center font-semibold px-3 py-2",isSelected ? "bg-teal-400" : "bg-foam")}>
        <div className="leading-4 font-[400]">{name}</div>
        {
            isFeesApply &&  <div className='absolute bottom-1 right-2   text-xl'> &#43;</div>
        }
    </div>
}


export default BookAppointmentItem