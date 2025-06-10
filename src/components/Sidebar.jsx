import { cn } from '../utils/cn'
import settings from '../assets/images/settings.png'
import home from '../assets/images/home.png'
import notifications from '../assets/images/notification.png'
import information from '../assets/images/information.png'
import book from '../assets/images/book.png'
import dummyProfile from '../assets/images/dummy-profile.png'
import closeMenu from '../assets/images/close-menu.png'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useNotificationStore } from '../store/notifications'

import { useSocket } from '../context/socketContext';
import { useAuthStore } from '../store/auth'

function Sidebar({ openMenu, setOpenMenu }) {

  const navigate = useNavigate()
  const { notifications: allNotifications,getNotifications } = useNotificationStore()
  const {user} = useAuthStore()

  const socket = useSocket();
  useEffect(() => {
    if(!socket) return;
    if(user){
      socket.emit("register",user?.id)
    }
    socket.on("recieved_notification",(notification) => {
        getNotifications()
    })
  }, [socket])
  
  useEffect(() => {
    getNotifications()
  }, [])

  const menuItems = [
    { label: 'home', image: home, link: "/dashboard" },
    { label: 'book now', image: book, link: "/book-appointment" },
    { label: 'notifications', image: notifications, link: "/notifications", newNotifications: allNotifications?.some(notification => !notification?.isRead) },
    { label: 'settings', image: settings, link: "/settings" },
    { label: 'help', image: information, link: "/help" },
  ]

  const navigateToPage = (link) => {
    navigate(link)
    setOpenMenu(false)
  }

  useEffect(() => {
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
        <div className='md:inline-block w-66 text-center pt-3 pb-10 bg-navy hidden' onClick={() => navigateToPage("/profile")}>
          <img className='m-auto w-5 w-[35px]' src={user?.profilePic ??  dummyProfile} alt='profile-pic' />
        </div>
      </div>

      <div className='flex overflow-hidden w-full'>
        <div onMouseEnter={() => setOpenMenu(true)} className='h-screen bg-navy hidden md:block' onClick={(e) => e.stopPropagation()}>
          {menuItems.map((item, index) => {
            return (
              <div
                className='whitespace-nowrap my-3 cursor-pointer rela'
                key={index}
                onClick={() => navigateToPage(item.link)}
              >
                <div className='inline-block w-66 text-center relative'>
                  <div className='m-auto max-w-max relative'>
                    <img className='m-auto ' src={item.image} alt='' />
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
          <div className='pt-[70px] pe-20'>
            {menuItems.map((item, index) => {
              return (
                <div
                  className='whitespace-nowrap sm:my-3 my-10 cursor-pointer flex items-center gap-5  '
                  key={index}
                  onClick={() => navigateToPage(item.link)}
                >
                  <div className='relative sm:hidden'>
                    <img src={item.image} alt="" />
                    {
                      item?.newNotifications && <div className='absolute top-1 right-0 h-05 w-05 bg-red-500 rounded-circle'> </div>
                    }

                  </div>
                  <div className='inline-block text-white'>{item.label}</div>
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
