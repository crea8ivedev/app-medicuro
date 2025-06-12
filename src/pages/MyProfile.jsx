import  { useRef, useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import dummyProfile from "../assets/images/dummy-profile.png"
import whitePen from "../assets/images/white-pen.png"
import leftArrow from "../assets/images/left-arrow.png"

import profileIcon from "../assets/images/profile.png"
import settingIcon from "../assets/images/settings-black.png"
import helpIcon from "../assets/images/question.png"
import privacyIcon from "../assets/images/privacy.png"
import logoutIcon from "../assets/images/logout.png"
import deleteIcon from "../assets/images/delete-black.png"

import { useFormik,Field,FormikProvider } from 'formik'
import CustomInput from '../components/CustomInput'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

function MyProfile() {

const navigate = useNavigate()
const profilePicRef = useRef()
const {user} = useAuthStore()

const [profilePic,setProfilePic] = useState(false)

const navigateToPage = (link) => {
    navigate(link)
}

const menuItems = [
  {
    label: "Profile",
    icon: profileIcon, // example icon name, e.g. from FontAwesome or your custom set
    action: "navigate",
    route: "/profile",
    onclick : () => navigateToPage("/profile/update")
  },
  {
    label: "Settings",
    icon: settingIcon,
    action: "navigate",
    route: "/settings",
    onclick : () => navigateToPage("/settings")

  },
  {
    label: "Help",
    icon: helpIcon,
    action: "navigate",
    route: "/help",
    onclick : () => navigateToPage("/help")
  },
  {
    label: "Privacy Policy",
    icon: privacyIcon,
    action: "navigate",
    route: "/privacy",
    onclick : () => navigateToPage("/privacy")
  },
  {
    label: "Logout",
    icon: logoutIcon,
    action: "logout" ,
    onclick : () => navigateToPage("/log-out")
  },
  {
    label: "Delete Account",
    icon: deleteIcon,
    action: "deleteAccount" ,
    onclick : () => navigateToPage("/profile/account/delete")
  }
];

// const changeProfilePic = (e) => {
//     const file = e.target.files[0];
//     const fileReader = new FileReader()
//     fileReader.onload = () => {
//         const fileData = fileReader.result;
//         setProfilePic(fileData)
//         console.log(fileData)
//     }
//     fileReader.readAsDataURL(file)
// }

return (
    <div className=' bg-sky-foam min-h-screen pb-16 relative'>
        <div className='common-bg absolute'></div>
        <div className='flex flex-col p-5'>
            <CommonBackBtn label='My Profile'  />
        </div>
        <div className='flex w-full justify-center items-center lg:pt-24'>
            <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 py-24 rounded-xl'>
            <div className='common-right-design z-10 bottom-5 right-5'></div>
                        <div className='relative max-w-max m-auto text-center'>
                                <img className='m-auto w-105 h-105 rounded-circle object-cover' src={ user?.profilePic ??  dummyProfile} alt="" />
                                {/* <div onClick={() => profilePicRef?.current?.click()}  className='p-3 bg-bluewave rounded-circle flex justify-center items-center w-30 h-30 absolute right-0 bottom-0 cursor-pointer'>
                                    <img src={whitePen} alt="" />
                                    <input onChange={(e) => changeProfilePic(e)} ref={profilePicRef} type="file" hidden />
                                </div> */}
                        </div>  
                        <div className='my-10'>
                            {
                                menuItems?.map((item,index) => {
                                    return <div key={index} onClick={ item.onclick && item.onclick } className='flex items-center justify-between max-w-xs m-auto my-4  cursor-pointer'>
                                        <div className='flex gap-5 items-center'>
                                            <div className='bg-teal h-40 w-40 flex  items-center justify-center rounded-circle'>
                                                <img src={item.icon} alt="" />
                                            </div>
                                            <div className='text-xl font-semibold'>{item.label}</div>
                                        </div>
                                        {
                                            item.route &&  <div className='text-xl font-bold'>
                                                <img src={leftArrow} alt="" />
                                            </div>
                                        }
                                    </div>
                                })
                            }
                        </div> 
            </div>
        </div>
    </div>
  )
}
export default MyProfile