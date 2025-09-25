import { Fragment, useEffect, useRef, useState } from 'react'
import loginSideImg from '../assets/images/login-vector.png'
import spinner from '../assets/images/spinner.gif'
import { NavLink } from 'react-router-dom'
import NotificationItem from '../components/NotificationItem'
import { cn } from '../utils/cn'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { showToast } from '../utils/toast'
import { useNotificationStore } from '../store/notifications'
import axiosInstance from '../utils/axios'
import CommonBackBtn from '../components/CommonBackBtn'
import { CirclePlus } from 'lucide-react'

export default function Notifications() {
  const { notifications, isLoading, markAsRead, getNotifications } =
    useNotificationStore()
  const [perPage, setPerPage] = useState(4)

  const notificationCount = notifications.length
  const [currentNotificationsPage, setCurrentNotificationsPage] = useState(0)

  const [initIsRead, setInitIsRead] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  const swiperRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setPerPage(3)
      } else {
        setPerPage(4)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function arrayChunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      showToast.success('The notification has been deleted successfully.')
      getNotifications()
    } finally {
      setIsDeleting(false)
    }
  }

  // mark as read
  const markAsreadNotifications = async (ids) => {
    const response = await axiosInstance.post(
      '/api/v1/notifications/mark-as-read',
      { ids },
    )
    if (response.data?.statusCode == 200) {
      markAsRead(ids)
    }
    setInitIsRead(false)
  }

  useEffect(() => {
    setInitIsRead(true)
    if (notifications && initIsRead && currentNotificationsPage == 0) {
      const firstPageNotifications = notifications.slice(0, perPage)
      const ids = firstPageNotifications?.map((e) => e.id)
      if (ids.length) {
        markAsreadNotifications(ids)
      }
    }
  }, [notifications])

  const handleSlideChange = (index) => {
    setCurrentNotificationsPage(index)
  }

  useEffect(() => {
    const start = currentNotificationsPage * perPage
    const end = start + perPage

    const notificationInPage = notifications.slice(start, end)
    const ids = notificationInPage?.map((notify) => notify.id)
    if (ids.length) markAsreadNotifications(ids)
  }, [currentNotificationsPage])

  const noNotificationItem = {
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    title: 'No Notifications',
    desc: 'You currently have no notifications. This section will display important updates and reminders, including information regarding your upcoming appointments. Please check back regularly for the latest notifications.',
    id: 'sample-id-1',
  }

  return (
    <div className='bg-ocean h-auto 2xl:h-[calc(100dvh-93px)]  w-full justify-between relative pb-0 md:overflow-hidden'>
      <div className='common-bg absolute left-0'></div>
      <div className='text-white pt-5 pl-4'>
        <CommonBackBtn
          link='/dashboard'
          label='Back to Dashboard'
          varient='white'
        />
      </div>
      <div className='container mx-auto h-screen flex items-start md:pt-10 justify-between relative custom-wrap'>
        <img className='hidden md:block left-image' src={loginSideImg} alt='' />

        <div className='right-container max-w-full'>
          <div className='flex gap-3 items-center mt-4'>
            <div className='text-black bg-sky-cyan font-semibold rounded-circle w-30 h-30 flex items-center justify-center'>
              {notificationCount}
            </div>
            <div className='text-white my-4'>Notifications</div>
          </div>

          <div className='flex gap-5 flex-wrap lg:flex-nowrap justify-center '>
            <div className='md:max-w-[470px] 2xl:max-w-500 w-full max-h-max rounded-xl'>
              {notifications.length ? (
                <Fragment>
                  <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) =>
                      handleSlideChange(swiper.activeIndex)
                    }
                    className='whitespace-nowrap lg:overflow-x-hidden overflow-x-auto hide-scrollbar  select-none'
                  >
                    {arrayChunk(notifications, perPage).map(
                      (chunk, chunkIndex) => (
                        <SwiperSlide
                          key={chunkIndex}
                          className=' inline-block w-full'
                        >
                          <div
                            data-id={chunkIndex}
                            className='flex flex-col  gap-4 snap-start px-1 container-items'
                          >
                            {chunk.map(({ title, desc, id, date }, index) => (
                              <NotificationItem
                                key={`${chunkIndex}-${index}`}
                                title={title}
                                desc={desc}
                                date={date}
                                id={id}
                                onDelete={handleDelete}
                                isDeleting={isDeleting}
                              />
                            ))}
                          </div>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>

                  <div className='flex justify-center gap-2 my-4'>
                    {arrayChunk(notifications, perPage).map((_, index) => {
                      return (
                        <div
                          onClick={() => swiperRef.current?.slideTo(index)}
                          key={index}
                          className={cn(
                            'h-15 cursor-pointer w-15 rounded-circle',
                            currentNotificationsPage == index
                              ? 'bg-teal-500'
                              : 'bg-white',
                          )}
                        >
                          {' '}
                        </div>
                      )
                    })}
                  </div>
                </Fragment>
              ) : isLoading ? (
                <img className='w-10 m-atuo' src={spinner} />
              ) : (
                <NotificationItem
                  title={noNotificationItem.title}
                  desc={noNotificationItem.desc}
                  date={noNotificationItem.date}
                  deletable={false}
                  isDeleting={isDeleting}
                />
              )}
            </div>

            <div className='w-full hidden lg:grid place-content-center lg:place-content-start'>
              <div className='lg:flex flex-col md:flex-row bg-white gap-10 rounded-xl py-4  ps-5 pe-5 md:max-w-[470px] md:min-w-[470px] 2xl:max-w-500 ms-auto'>
                <div className='flex flex-col gap-1'>
                  <div className='text-bluewave text-xl font-semibold'>
                    Book Appointment
                  </div>
                  <div>
                    Book your appointment with a licensed Medicuro doctor at
                    your convenience
                  </div>
                </div>
                <NavLink to='/book-appointment'>
                  <div className='flex flex-col gap-1 justify-center items-center bg-teal border-2 border-teal p-4 rounded-xl hover:bg-white hover:border-2 border-bg-teal'>
                    {/* <img className='w-10' src={plusBtn} alt='' /> */}
                    <CirclePlus size={40} className='w-10' />
                    <div className='text-sm whitespace-nowrap'>Book Now</div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
