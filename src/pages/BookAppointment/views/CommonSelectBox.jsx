import { useEffect } from "react"
import { cn } from "../../../utils/cn"

const CommonSelectBox = ({
    options=[],
    className,
    fields


    }) => {
    
    useEffect(() => {
        console.log(fields)
    },[fields])
    
    return <select className={cn("bg-white w-full h-45",className)}>
        {
            options.map((e) => {
                return <option value={e.value}>{e.name}</option>
            })
        }
    </select>
}

export default CommonSelectBox