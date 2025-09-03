import CommonBackBtn from '../components/CommonBackBtn'
import leftArrow from "../assets/images/left-arrow.png"
import profileIcon from "../assets/images/profile.png"
import bulbIcon from "../assets/images/bulb.png"
import keyIcon from "../assets/images/key.png"
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'
// provider

function Settings() {
const user = useAuthStore(state => state.user)

const menuItems = [
  
  {
    label: "Notification Setting",
    icon: bulbIcon,
    action: "navigate",
    route: "/notifications/settings"
  }, 
  
  ...((user?.provider != "google" && user?.provider != "facebook") ? [{
            label: "Password Manager",
            icon: keyIcon,
            action: "navigate",
            route: "/password/reset"
  }] : [] ),
  {
    label: "Delete Account",
    icon: profileIcon,
    action: "navigate",
    route: "/profile/account/delete"
  }
];

return (
    <div className=' bg-sky-foam h-screen pb-16 relative '>
        <div className='common-bg absolute left-0 right-0 '></div>

        <div className='flex flex-col p-5  '>
            <CommonBackBtn label='Settings'  />
        </div>

        <div className='flex  w-full justify-center items-center lg:mt-24'>
            <div className='bg-mint relative w-825 p-10 flex flex-col gap-7'>
            <div className='common-right-design  z-10 bottom-5 right-5'></div>
                                <div className='my-10'>
                                {
                                    menuItems?.map((item,index) => {
                                        return <NavLink key={index} to={item.route}>
                                            <div key={index} onClick={ item.onclick && item.onclick } className='flex items-center justify-between max-w-xs m-auto py-3 rounded-md  hover:scale-105 px-2  cursor-pointer'>
                                            <div className='flex gap-5 items-center'>
                                                <div className=' h-40 w-40 flex items-center justify-center rounded-circle'>
                                                    <img src={item.icon} alt="" />
                                                </div>
                                                <div className='sm:text-xl font-semibold'>{item.label}</div>
                                            </div>
                                            {
                                                item.route &&  <div className='text-xl font-bold'>
                                                    <img src={leftArrow} alt="" />
                                                </div>
                                            }
                                            
                                        </div>
                                        </NavLink>
                                    })
                                }
                            </div> 
            </div>
        </div>
    </div>
  )
}



export default Settings