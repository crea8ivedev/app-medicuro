import { Fragment, useEffect, useRef, useState } from 'react';
import loginSideImg from '../assets/images/login-vector.png';
import spinner from '../assets/images/spinner.gif';
import plusBtn from '../assets/images/plus-black.png';
import { NavLink } from 'react-router-dom';
import NotificationItem from '../components/NotificationItem';
import { cn } from '../utils/cn';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { showToast } from '../utils/toast';
import { useNotificationStore } from '../store/notifications';
import axiosInstance from '../utils/axios';

export default function Notifications() {

  const { notifications,isLoading,markAsRead,getNotifications } = useNotificationStore()
  const [perPage,setPerPage] = useState(4)

  const notificationCount = notifications.length
  const [currentNotificationsPage,setCurrentNotificationsPage] = useState(0)
  
  const [initIsRead,setInitIsRead] = useState(true)

  const swiperRef = useRef(null);

  function arrayChunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const handleDelete = () => {
    showToast.success("Notification deleted successfully")
    getNotifications()  
  }
  
  // mark as read
  const markAsreadNotifications = async (ids) => {
          const response = await axiosInstance.post('/api/v1/notifications/mark-as-read', {ids})
          if(response.data?.statusCode == 200){
            markAsRead(ids)
          }
          setInitIsRead(false)
  }

  useEffect(() => {
    setInitIsRead(true)
    if(notifications && initIsRead && currentNotificationsPage == 0){
      const firstPageNotifications = notifications.slice(0,perPage)
      const ids = firstPageNotifications?.map(e => e.id)
      if(ids.length){
        markAsreadNotifications(ids)
      }
    }
  },[notifications])

  const handleSlideChange =  (index) => {
    setCurrentNotificationsPage(index)
  }

  useEffect(() => {
    const start = currentNotificationsPage * perPage;
    const end = start + perPage;

    const notificationInPage = notifications.slice(start,end)
    const ids = notificationInPage?.map(notify => notify.id)
    if(ids.length)  markAsreadNotifications(ids)
    
  },[currentNotificationsPage])

  return (
    <div className='bg-ocean min-h-screen w-full justify-between relative pb-10'>
      <div className='common-bg absolute left-0'></div>
      <div className='container mx-auto min-h-screen flex items-center justify-between relative  custom-wrap md:px-10 px-3  '>
        <img className='hidden md:block left-image' src={loginSideImg} alt='' />

        <div className='right-container max-w-full'>
           <div className='flex gap-3 items-center mt-4'>
                <div className='text-black bg-sky-cyan font-semibold rounded-circle w-30 h-30 flex items-center justify-center'>{notificationCount}</div>
                <div className='text-white my-4'>Notifications</div>
          </div>

          <div className='flex gap-5 flex-wrap lg:flex-nowrap '>
              <div className='md:min-w-500 md:max-w-500 w-full   max-h-max  rounded-xl'>
               {
                notifications.length ?  
                  <Fragment>
                      <Swiper   
                          onSwiper={(swiper) => swiperRef.current = swiper}
                          onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)} 
                          className='whitespace-nowrap overflow-x-auto hide-scrollbar  select-none' 
                      >
                          {arrayChunk(notifications, perPage).map((chunk, chunkIndex) => (
                          <SwiperSlide key={chunkIndex} className=' inline-block w-full'>
                            <div data-id={chunkIndex} className='flex flex-col  gap-4 snap-start px-1 container-items'>
                              {chunk.map(
                                ({ title, desc,id ,date}, index) => (
                                  <NotificationItem
                                    key={`${chunkIndex}-${index}`}
                                    title={title}
                                    desc={desc}
                                    date={date}
                                    id={id}
                                    onDelete={handleDelete}
                                  />
                                ),
                              )}
                            </div>
                          </SwiperSlide>
                          ))}
                      </Swiper>

                      <div className='flex justify-center gap-2 my-4'>
                        {arrayChunk(notifications, perPage).map((_, index) => {
                          return (
                            <div
                              onClick={() => swiperRef.current?.slideTo(index)}
                              key={index}
                              className={cn("h-15 cursor-pointer w-15 rounded-circle",currentNotificationsPage == index ? "bg-teal-500" : "bg-white")}
                            >
                              {' '}
                            </div>
                          )
                        })}
                      </div>
                  </Fragment>

                  :
                  ( isLoading ? 
                      <img className='w-10 m-atuo'  src={spinner} />
                      : 
                      "No Notifications" )
                  
               }
              </div>
              
              <div className='w-full'>
                  <div className="flex w-full md:flex-nowrap flex-wrap-reverse  items-center justify-center md:min-w-500  md:max-w-500 bg-white gap-5 rounded-xl px-7 py-4">
                      <div className="flex flex-col items-center md:items-start justify-center ">
                        <div className="text-bluewave font-semibold">Book Appointment</div>
                        <div>Book your appointment with a licensed Medicuro doctor at your convenience</div>
                      </div>
                        <NavLink to="/book-appointment">
                            <div className="flex  flex-col gap-2 justify-center items-center bg-teal-500 p-5 rounded-md">
                              <img src={plusBtn} alt="" />
                              <div className="text-sm whitespace-nowrap">Book Now</div>
                            </div>
                        </NavLink>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
