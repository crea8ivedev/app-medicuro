import { useRef, useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { showToast } from '../utils/toast'
import axiosInstance from '../utils/axios'
import { cn } from '../utils/cn'
import {
  User,
  UserCircle,
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
      action: 'navigate',
      route: '/profile',
      onclick: () => navigateToPage('/profile/update'),
      Icon: User,
    },
    {
      label: 'Settings',
      action: 'navigate',
      route: '/settings',
      onclick: () => navigateToPage('/settings?profile=true'),
      Icon: Settings,
    },
    {
      label: 'Help',
      action: 'navigate',
      route: '/help',
      onclick: () => navigateToPage('/help?profile=true'),
      Icon: HelpCircle,
    },
    {
      label: 'Privacy Policy',
      action: 'navigate',
      route: '/privacy',
      onclick: () => navigateToPage('/privacy?profile=true'),
      Icon: Lock,
    },
    {
      label: 'Logout',
      action: 'logout',
      onclick: () => navigateToPage('/log-out'),
      Icon: LogOut,
    },
    {
      label: 'Delete Account',
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
          login({ user: { ...user, profilePic: response.data.profilePic } })
          setProfilePic(null)
        }
      }
    } catch (error) {
      showToast.error('Failed to update profile picture')
    } finally {
      setProfilePicSubmitting(false)
    }
  }

  return (
    <div className='bg-sky-foam min-h-[calc(100dvh-56px)] 2xl:min-h-[calc(100dvh-93px)] 2xl:max-h-[calc(100dvh-93px)] md:pb-10 relative md:overflow-hidden'>
      <div className='common-bg absolute'></div>
      <div className='flex flex-col p-5'>
        <CommonBackBtn label='Back to Dashboard' link='/' />
      </div>
      <div className='flex w-full justify-center items-center lg:pt-0'>
        <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 py-10 rounded-xl'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>
          <div className='relative max-w-max m-auto text-center'>
            {profilePic || user?.profilePic ? (
              <img
                className='m-auto w-105 h-105 rounded-circle object-cover'
                src={profilePic ?? user?.profilePic}
                alt=''
              />
            ) : (
              <UserCircle className='m-auto w-105 h-105 text-gray-400' />
            )}
            <div
              onClick={() => profilePicRef?.current?.click()}
              className='bg-bluewave rounded-circle flex justify-center items-center w-30 h-30 absolute right-0 bottom-0 cursor-pointer p-2'
            >
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
          <div className='my-5'>
            {menuItems?.map(({ Icon, ...item }, index) => (
              <div
                key={index}
                onClick={item.onclick && item.onclick}
                className='flex group items-center justify-between max-w-xs m-auto my-4 cursor-pointer hover:scale-105 transition-all duration-75'
              >
                <div className='flex gap-5 items-center'>
                  <div className='bg-teal h-40 w-40 flex items-center justify-center rounded-circle'>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyProfile
