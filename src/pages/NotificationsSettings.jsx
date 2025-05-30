
import CommonBackBtn from '../components/CommonBackBtn'
import leftArrow from "../assets/images/left-arrow.png"

import profileIcon from "../assets/images/profile.png"
import bulbIcon from "../assets/images/bulb.png"
import keyIcon from "../assets/images/key.png"
import { NavLink } from 'react-router-dom'
import CustomToggleSwitch from '../components/CustomToggleSwitch'

function NotificationsSettings() {


const menuItems = [
  
  {
    label: "General Notification",
    action: "navigate",
    route: "/settings"
  },
  {
    label: "Sound",
    action: "navigate",
    route: "/help"
  },
  {
    label: "Sound Call",
    action: "navigate",
    route: "/privacy-policy"
  },
  {
    label: "vibrate",
    action: "navigate",
    route: "/privacy-policy"
  },
];

const handleChange = (isChecked) => {
    // alert(isChecked)
}

return (

    <div className=' bg-sky-foam h-screen pb-16 relative'>
        <div className='common-bg'></div>

        <div className='flex flex-col p-5  '>
            <CommonBackBtn label='Settings'  />
        </div>

        <div className='flex  w-full justify-center items-center md:mt-24'>
            <div className='bg-mint relative w-825 md:p-10 p-5 flex flex-col gap-7'>
            <div className='common-right-design  z-10 bottom-5 right-5'></div>

                                <div className='my-10'>
                                {
                                    menuItems?.map((item,index) => {
                                        return  <div key={index} onClick={ item.onclick && item.onclick } className='flex items-center justify-between max-w-md m-auto my-4  cursor-pointer gap-15'>
                                            <div className='flex gap-5  items-center'>
                                                <div className='sm:text-xl font-semibold'>{item.label}</div>
                                            </div>
                                            
                                            <div>
                                                <CustomToggleSwitch onChange={handleChange}/>
                                            </div>
                                            
                                        </div>
                                       
                                        
                                    })
                                }
                            </div> 
            </div>
        </div>
    </div>
  )
}



export default NotificationsSettings