import { Fragment, use, useEffect, useRef, useState } from 'react';
import loginSideImg from '../assets/images/login-vector.png';
import spinner from '../assets/images/spinner.gif';
import plusBtn from '../assets/images/plus-black.png';
import { data, NavLink } from 'react-router-dom';
import NotificationItem from '../components/NotificationItem';
import { cn } from '../utils/cn';

import { Swiper, SwiperSlide } from 'swiper/react';
import axiosInstance from '../utils/axios';

import 'swiper/css';
import { showToast } from '../utils/toast';

export default function Notifications() {

  const [isLoading,setIsLoading] = useState(false)
  const [notificationCount,setNotificationCount] = useState(0)
  const [currentNotificationsPage,setCurrentNotificationsPage] = useState(0)
  const [NotificationsList,setNotificationList] = useState([])

  const swiperRef = useRef(null);

  const   getNotifications = async () => {
    try {
      setIsLoading(true)
      const reponse = await axiosInstance.get("/api/v1/notifications");
      console.log(reponse?.data?.statusCode == 200)
      if(reponse?.data?.statusCode == 200){
        const data = reponse?.data?.data;
        setNotificationCount(data?.length)
        setNotificationList(data)
      }
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
    
  }
  useEffect(() => {
      getNotifications()
  },[])

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
                NotificationsList.length ?  
                  <Fragment>
                      <Swiper   
                          onSwiper={(swiper) => swiperRef.current = swiper}
                          onSlideChange={(swiper) => setCurrentNotificationsPage(swiper.activeIndex)} 
                          className='whitespace-nowrap overflow-x-auto hide-scrollbar  select-none' 
                      >
                          {arrayChunk(NotificationsList, 4).map((chunk, chunkIndex) => (
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
                        {arrayChunk(NotificationsList, 4).map((_, index) => {
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
