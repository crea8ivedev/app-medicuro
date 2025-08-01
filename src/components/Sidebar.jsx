import { cn } from '../utils/cn'

import settings from '../assets/images/settings.svg'
import home from '../assets/images/home.svg'
import notifications from '../assets/images/notifications.svg'
import information from '../assets/images/information.svg'
import book from '../assets/images/book.svg'

//active icons
import activesettings from '../assets/images/active-settings.svg'
import activeHome from '../assets/images/active-home.svg'
import activeNotifications from '../assets/images/active-notification.svg'
import activeInformation from '../assets/images/active-info.svg'
import activeBook from '../assets/images/active-book.svg'

import dummyProfile from '../assets/images/dummy-profile.svg'
import closeMenu from '../assets/images/close-menu.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNotificationStore } from '../store/notifications'

import { useSocket } from '../context/socketContext';
import { useAuthStore } from '../store/auth'
import { showToast } from '../utils/toast'

function Sidebar({ openMenu, setOpenMenu }) {

  const navigate = useNavigate()
  const { notifications: allNotifications,getNotifications } = useNotificationStore()
  const {user,logout} = useAuthStore()
  
  const socket = useSocket();

  const {pathname } = useLocation();
  const [activeMenu,setActiveMenu] = useState("dashboard")

  useEffect(() => {
      setActiveMenu(pathname )
  },[pathname ])

   const checkIfActive = (url) => {
    return activeMenu?.includes(url);
  };

  useEffect(() => {
    if(!socket) return;
    if(user){
      socket.emit("register",user?.id)
    }
    socket.on("recieved_notification",getNotifications)

    const logoutWithToast = () => {
      showToast.error("Password was changed by admin.");
      logout();
    }
    
    socket.on("logout-user",logoutWithToast)

    return () => {
       socket && socket.off("recieved_notification",getNotifications)
       socket && socket.off("logout-user",logoutWithToast)
    }
  }, [socket])
  
  useEffect(() => {
    getNotifications()
  }, [])

 const menuItems = [
  {
    label: 'Home',
    isActive: checkIfActive("dashboard"),
    image: checkIfActive("dashboard") ? activeHome : home,
    link: "/dashboard"
  },
  {
    label: 'Book Now',
    isActive: checkIfActive("book-appointment"),
    image: checkIfActive("book-appointment") ? activeBook : book,
    link: "/book-appointment"
  },
  {
    label: 'Notifications',
    isActive: checkIfActive("notifications"),
    image: checkIfActive("notifications") ? activeNotifications : notifications,
    link: "/notifications",
    newNotifications: allNotifications?.some(notification => !notification?.isRead)
  },
  {
    label: 'Settings',
    isActive: checkIfActive("settings"),
    image: checkIfActive("settings") ? activesettings : settings,
    link: "/settings"
  },
  {
    label: 'Help',
    isActive: checkIfActive("help"),
    image: checkIfActive("help") ? activeInformation : information,
    link: "/help"
  }
];

  const navigateToPage = (link) => {
    navigate(link)
    setOpenMenu(false)
  }

  useEffect(() => {

    setOpenMenu(true)

    const closeMenu = () => {
      setOpenMenu(false)
    }
    document.addEventListener("click", closeMenu)
    return () => {
      document.removeEventListener("click", closeMenu)
    }
  }, [])

  return (
    <div className='fixed h-screen top-0 left-0 transition-all z-1'>
      <div
        onClick={(e) => {
          e.stopPropagation()
          setOpenMenu(false)
        }}
        className='flex justify-between pe-2 whitespace-nowrap cursor-pointer'
      >
        <div className='md:flex items-center   md:w-66 text-center h-[93px] bg-navy hidden' onClick={() => navigateToPage("/profile")}>
          <img className='m-auto w-5 w-[35px] h-[35px] object-cover rounded-circle ' src={user?.profilePic ??  dummyProfile} alt='profile-pic' />
        </div>
      </div>

      <div className='flex overflow-hidden w-full'>
        <div onMouseEnter={() => setOpenMenu(true)} className='h-screen bg-navy hidden md:flex md:flex-col gap-4' onClick={(e) => e.stopPropagation()}>
          {menuItems.map((item, index) => {
            return (
              <div
                className='whitespace-nowrap max-h-[19px]'
                key={index}
                onClick={() => navigateToPage(item.link)}
              >
                <div className='inline-block w-66 text-center relative'
                key={index}
                onClick={() => navigateToPage(item.link)}
                >
                  <div className='m-auto max-w-max relative'>
                    <div className=' flex items-center'>
                       <img className='m-auto max-h-[19px]' src={item.image} alt='' />
                    </div>
                    {
                      item?.newNotifications && <div className='absolute top-1 right-0 h-05 w-05 bg-red-500 rounded-circle'> </div>
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={cn(
            'bg-navy md:bg-navy/95 w-full md:w-auto transition-all h-screen fixed left-0 top-0 -z-10 ps-75',
            openMenu ? 'left-0' : '-left-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-end cursor-pointer' onClick={() => setOpenMenu(false)}>
            <img
              src={closeMenu}
              className='ms-auto pe-3 pt-3'
              alt=''
            />
          </div>
          <div className='pt-[61px] pe-40 flex flex-col md:gap-4 gap-10'>
            {menuItems.map((item, index) => {
              return (
                <div
                  className='whitespace-nowrap   cursor-pointer flex items-center gap-5  '
                  key={index}
                  onClick={() => navigateToPage(item.link)}
                >
                  <div className='relative sm:hidden'>
                    <img src={item.image} alt="" />
                    {
                      item?.newNotifications  && <div className='absolute top-1 right-0 h-05 w-05 bg-red-500 rounded-circle'> </div>
                    }
                  </div>
                  <div className={cn('md:inline-block text-white hover:text-aqua flex items-center max-h-[19px]',item?.isActive && "text-aqua")}>{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
