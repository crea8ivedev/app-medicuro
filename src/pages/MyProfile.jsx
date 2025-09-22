import { useRef, useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import dummyProfile from '../assets/images/logo.svg'
import whitePen from '../assets/images/white-pen.svg'
import leftArrow from '../assets/images/left-arrow.png'

import profileIcon from '../assets/images/profile.png'
import settingIcon from '../assets/images/settings-black.png'
import helpIcon from '../assets/images/question.png'
import privacyIcon from '../assets/images/privacy.png'
import logoutIcon from '../assets/images/logout.png'
import deleteIcon from '../assets/images/delete-black.png'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { showToast } from '../utils/toast'
import axiosInstance from '../utils/axios'
import { cn } from '../utils/cn'
import {
  User,
  Settings,
  HelpCircle,
  Lock,
  LogOut,
  Trash2,
  ChevronDown,
  ChevronUp,
  Pen,
  Pencil,
} from 'lucide-react'

function MyProfile() {
  const navigate = useNavigate()
  const profilePicRef = useRef()
  const { user, login } = useAuthStore()

  const [profilePic, setProfilePic] = useState()
  const [profilePicSubmitting, setProfilePicSubmitting] = useState(false)

  const navigateToPage = (link) => {
    navigate(link)
  }

  const menuItems = [
    {
      label: 'Profile',
      icon: profileIcon, // example icon name, e.g. from FontAwesome or your custom set
      action: 'navigate',
      route: '/profile',
      onclick: () => navigateToPage('/profile/update'),
      Icon: User,
    },
    {
      label: 'Settings',
      icon: settingIcon,
      action: 'navigate',
      route: '/settings',
      onclick: () => navigateToPage('/settings?profile=true'),
      Icon: Settings,
    },
    {
      label: 'Help',
      icon: helpIcon,
      action: 'navigate',
      route: '/help',
      onclick: () => navigateToPage('/help?profile=true'),
      Icon: HelpCircle,
    },
    {
      label: 'Privacy Policy',
      icon: privacyIcon,
      action: 'navigate',
      route: '/privacy',
      onclick: () => navigateToPage('/privacy?profile=true'),
      Icon: Lock,
    },
    {
      label: 'Logout',
      icon: logoutIcon,
      action: 'logout',
      onclick: () => navigateToPage('/log-out'),
      Icon: LogOut,
    },
    {
      label: 'Delete Account',
      icon: deleteIcon,
      action: 'deleteAccount',
      onclick: () => navigateToPage('/profile/account/delete'),
      Icon: Trash2,
    },
  ]

  const changeProfilePic = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const fileData = fileReader.result
      setProfilePic(fileData)
    }
    fileReader.readAsDataURL(file)
    uploadProfilePic(file)
  }

  const uploadProfilePic = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('profilePic', file)
    setProfilePicSubmitting(true)
    try {
      const response = await axiosInstance.post(
        '/api/v1/auth/profile-picture/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.data?.statusCode === 200) {
        showToast.success('Your profile picture has been updated successfully.')
        if (response.data?.profilePic) {
          // Optionally update user state
          login({ user: { ...user, profilePic: response.data.profilePic } })
        }
      }
    } catch (error) {
      showToast.error('Failed to update profile picture')
    } finally {
      setProfilePicSubmitting(false)
    }
  }

  return (
    <div className=' bg-sky-foam min-h-screen pb-16 relative'>
      <div className='common-bg absolute'></div>
      <div className='flex flex-col p-5'>
        <CommonBackBtn label='Back to Dashboard' link='/' />
      </div>
      <div className='flex w-full justify-center items-center lg:pt-24'>
        <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 py-24 rounded-xl'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>
          <div className='relative max-w-max m-auto text-center'>
            <img
              className='m-auto w-105 h-105 rounded-circle object-contain'
              src={profilePic ?? user?.profilePic ?? dummyProfile}
              alt=''
            />
            <div
              onClick={() => profilePicRef?.current?.click()}
              className=' bg-bluewave rounded-circle flex justify-center items-center w-30 h-30 absolute right-0 bottom-0 cursor-pointer p-2'
            >
              {/* <img src={whitePen}  alt="profile-pic" className={cn(profilePicSubmitting && "opacity-70 cursor-not-allowed")} /> */}
              <Pencil
                className={cn(
                  profilePicSubmitting && 'opacity-70 cursor-not-allowed',
                  'text-white',
                )}
              />
              <input
                onChange={(e) => changeProfilePic(e)}
                accept='image/jpeg,image/png,image/webp,image/avif,image/jpg'
                disabled={profilePicSubmitting}
                ref={profilePicRef}
                type='file'
                hidden
              />
            </div>
          </div>
          <div className='my-10'>
            {menuItems?.map(({ Icon, ...item }, index) => {
              return (
                <div
                  key={index}
                  onClick={item.onclick && item.onclick}
                  className='flex group items-center justify-between max-w-xs m-auto my-4  cursor-pointer hover:scale-105 transition-all duration-75'
                >
                  <div className='flex gap-5 items-center'>
                    <div className='bg-teal h-40 w-40 flex   items-center justify-center rounded-circle'>
                      {/* <img src={item.icon} alt="" /> */}
                      <Icon />
                    </div>
                    <div className='text-xl font-semibold'>{item.label}</div>
                  </div>
                  {item.route && (
                    <div className='text-xl font-bold'>
                      <ChevronUp className='rotate-90' />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyProfile
