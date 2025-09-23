import { cn } from '../utils/cn'
import dummyProfile from '../assets/images/logo.svg'
import closeMenu from '../assets/images/close.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNotificationStore } from '../store/notifications'
import { useSocket } from '../context/socketContext'
import { useAuthStore } from '../store/auth'
import { showToast } from '../utils/toast'

import {
  Home as HomeIcon,
  User,
  PlusCircle,
  Bell,
  Settings,
  Info,
  LogOutIcon,
  XCircle,
} from 'lucide-react'

function Sidebar({ openMenu, setOpenMenu }) {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  const { notifications: allNotifications, getNotifications } =
    useNotificationStore()
  const [currentHoveredIcon, setCurrentHoveredIcon] = useState('')
  const { user, logout } = useAuthStore()

  const socket = useSocket()

  const { pathname } = useLocation()
  const [activeMenu, setActiveMenu] = useState('dashboard')

  useEffect(() => {
    setActiveMenu(pathname)
  }, [pathname])

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    const closeMenu = () => {
      setOpenMenu(false)
    }
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = openMenu ? 'hidden' : ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, openMenu])

  const checkIfActive = (url) => {
    return activeMenu?.includes(url)
  }

  useEffect(() => {
    if (!socket) return
    if (user) {
      socket.emit('register', user?.id)
    }
    socket.on('recieved_notification', getNotifications)

    const logoutWithToast = () => {
      showToast.error('Password was changed by admin.')
      logout()
    }

    socket.on('logout-user', logoutWithToast)

    return () => {
      socket && socket.off('recieved_notification', getNotifications)
      socket && socket.off('logout-user', logoutWithToast)
    }
  }, [socket])

  useEffect(() => {
    getNotifications()
  }, [])

  //  const menuItems = [
  //   {
  //     label: 'Home',
  //     isActive: checkIfActive("dashboard"),
  //     image: checkIfActive("dashboard") ? activeHome : home,
  //     link: "/dashboard",
  //     Icon : HomeIcon,
  //     isActive:  checkIfActive("dashboard")
  //   },
  //    {
  //     label: 'Profile',
  //     isActive: checkIfActive("profile"),
  //     image: checkIfActive("profile") ? activeUserProfile : userProfile,
  //     link: "/profile",
  //     Icon : User,
  //     isActive : checkIfActive("profile")
  //   },
  //   {
  //     label: 'Book Now',
  //     isActive: checkIfActive("book-appointment"),
  //     image: checkIfActive("book-appointment") ? activeBook : book,
  //     link: "/book-appointment",
  //     Icon : PlusCircle,
  //     isActive : checkIfActive("book-appointment")
  //   },
  //   {
  //     label: 'Notifications',
  //     isActive: checkIfActive("notifications"),
  //     image: checkIfActive("notifications") ? activeNotifications : notifications,
  //     link: "/notifications",
  //     newNotifications: allNotifications?.some(notification => !notification?.isRead),
  //     Icon : Bell,
  //     isActive : checkIfActive("notifications")
  //   },
  //   {
  //     label: 'Settings',
  //     isActive: checkIfActive("settings"),
  //     image: checkIfActive("settings") ? activesettings : settings,
  //     link: "/settings",
  //     Icon : Settings ,
  //     isActive : checkIfActive("settings")
  //   },
  //   {
  //     label: 'Help',
  //     isActive: checkIfActive("help"),
  //     image: checkIfActive("help") ? activeInformation : information,
  //     link: "/help",
  //     Icon : Info,
  //     isActive : checkIfActive("help")
  //   },
  //   {
  //     label: 'Logout',
  //     isActive: false,
  //     image: logoutIcon,
  //     link: "/log-out",
  //     Icon : logOutIcon ,
  //   }
  // ];

  const [menuItems, setMenuItems] = useState([
    {
      label: 'Home',
      link: '/dashboard',
      Icon: HomeIcon,
    },
    {
      label: 'Profile',
      link: '/profile',
      Icon: User,
    },
    {
      label: 'Book Now',
      link: '/book-appointment',
      Icon: PlusCircle,
    },
    {
      label: 'Notifications',
      link: '/notifications',
      Icon: Bell,
      newNotifications: allNotifications?.some((n) => !n?.isRead),
    },
    {
      label: 'Settings',
      link: '/settings',
      Icon: Settings,
    },
    {
      label: 'Help',
      link: '/help',
      Icon: Info,
    },
    {
      label: 'Logout',
      link: '/log-out',
      Icon: LogOutIcon,
    },
  ])

  const navigateToPage = (link) => {
    navigate(link)
    setOpenMenu(false)
  }

  useEffect(() => {
    // setOpenMenu(true)

    const closeMenu = () => {
      setOpenMenu(false)
    }
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  const handleMouseEnter = (link) => {
    setCurrentHoveredIcon(link)
  }

  const handleMouseLeave = () => {
    setCurrentHoveredIcon(null)
  }

  return (
    <div className='fixed h-screen top-0 left-0 transition-all duration-500 z-1'>
      <div
        onClick={(e) => {
          e.stopPropagation()
          setOpenMenu(false)
        }}
        className='flex justify-between pe-2 whitespace-nowrap cursor-pointer'
      >
        <div
          className={cn(
            'md:flex ms-3 md:ms-0 mt-5 md:mt-0 items-center   md:w-66 text-center md:h-[93px] bg-navy',
            !openMenu && 'hidden',
          )}
          onClick={() => navigateToPage('/profile')}
        >
          <img
            className='m-auto  object-cover rounded-circle h-[44px] w-[44px] object-cover hover:scale-110 transition-all duration-500  '
            src={user?.profilePic ?? dummyProfile}
            alt='profile-pic'
          />
        </div>
      </div>

      <div className='flex overflow-hidden w-full'>
        <div
          onMouseEnter={() => setOpenMenu(true)}
          className='h-screen bg-navy pt-3 hidden md:flex md:flex-col gap-8'
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map(({ Icon, ...item }, index) => {
            return (
              <div
                className='whitespace-nowrap max-h-[19px]'
                key={index}
                onClick={() => navigateToPage(item.link)}
              >
                <div
                  className='inline-block w-66 text-center relative'
                  key={index}
                  onClick={() => navigateToPage(item.link)}
                >
                  <div className='m-auto max-w-max relative'>
                    <div
                      className=' flex items-center cursor-pointer'
                      onMouseEnter={() => handleMouseEnter(item.link)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            'text-white w-[20px] h-[20px] m-auto hover:text-[#5ef1fa]',
                            (checkIfActive(item.link) ||
                              currentHoveredIcon == item.link) &&
                              'text-[#5ef1fa]',
                          )}
                        />
                      )}
                    </div>
                    {item?.newNotifications && (
                      <div className='absolute top-1 right-0 h-05 w-05 bg-red-500 rounded-circle'>
                        {' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={cn(
            'bg-navy  w-full md:w-auto transition-all duration-500 h-screen fixed left-0 top-0 -z-10 md:ps-75  md:pt-0 ',
            openMenu ? 'left-0' : '-left-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='flex justify-end cursor-pointer'
            onClick={() => setOpenMenu(false)}
          >
            {/* <img
              src={closeMenu}
              className='ms-auto pe-3 pt-3'
              alt=''
            /> */}
            <XCircle size={27} className='ms-auto pe-3 pt-3 text-white' />
          </div>
          <div className='md:mt-[75px] mt-[60px] pe-40 flex flex-col md:gap-8 gap-8  border-t-[0.5px] border-aqua pt-8 md:border-0 md:pt-0'>
            {menuItems.map(({ Icon, ...item }, index) => {
              return (
                <div
                  className='whitespace-nowrap ps-5 md:ps-0   cursor-pointer flex items-center gap-5  '
                  key={index}
                  onClick={() => navigateToPage(item.link)}
                  onMouseEnter={() => handleMouseEnter(item.link)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <div className='relative sm:hidden'>
                    {Icon && (
                      <Icon
                        className={cn(
                          'text-white w-[20px] h-[20px]  ',
                          (checkIfActive(item.link) ||
                            currentHoveredIcon == item.link) &&
                            'text-[#5ef1fa]',
                        )}
                      />
                    )}
                    {item?.newNotifications && (
                      <div className='absolute top-1 right-0 h-05 w-05 bg-red-500 rounded-circle'>
                        {' '}
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      'md:inline-block text-white hover:text-aqua flex items-center max-h-[19px]',
                      (checkIfActive(item.link) ||
                        currentHoveredIcon == item.link) &&
                        'text-aqua',
                    )}
                  >
                    {item.label}
                  </div>
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
