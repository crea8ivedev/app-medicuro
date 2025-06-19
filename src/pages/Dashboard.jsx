import { Fragment, useEffect, useRef, useState } from 'react';
import loginSideImg from '../assets/images/login-vector.png';
import plusBtn from '../assets/images/bookIcon.svg';
import AppointmentItem from "../components/AppointmentItem";
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosInstance from '../utils/axios';
import { useAppointmentStore } from '../store/appointments';
import spinner from '../assets/images/spinner.gif';
import 'swiper/css';

export default function Dashboard() {

  const { upcomingAppointments, pastAppointments, setAppointments, clearAppointments } = useAppointmentStore()

  const upcomingContainerRef = useRef(null)
  const pastContainerRef = useRef(null)

  const [isLoading, setIsloading] = useState(false)
  const [currentUpcomingAppointmentPage, setCurrentUpcomingAppointmentPage] = useState(0)
  const [currentPastAppointmentPage, setCurrentPastAppointmentPage] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true)
        const response = await axiosInstance.get("/api/v1/appointments")
        if (response.data?.statusCode == 200) {
          const data = response.data
          setAppointments(data)
        } else {
          clearAppointments()
        }

      } catch (error) {
        clearAppointments()
      } finally {
        setIsloading(false)
      }

    }
    fetchData()

  }, [])

  const ViewpastAppoinments = (id) => {
    navigate(`/view-appointment/Past/${id}`)
  }

  const pastAppointmentBtns = [{ name: 'View', action: ViewpastAppoinments }]

  const upcomingAppoinmentBtns = [
    { name: 'View', action: (id) => navigate(`/view-appointment/Upcoming/${id}`) },
    { name: 'Rebook', action: (id) => navigate(`/rebook-appointment/${id}`) },
    { name: 'Cancel', action: (id) => navigate(`/cancel-appointment/${id}`) },
  ]

  function arrayChunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr?.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  return (
    <div className='bg-ice px-3 py-5 md:py-0 min-h-screen w-full justify-between relative'>
      <div className='common-bg absolute left-0  bottom-100 bg-bottom'></div>
      <div className='container mx-auto md:py-24  flex items-center justify-between relative md:px-5'>
        <img className='left-image' src={loginSideImg} alt='left-image' />
        <div className='max-w-full m-auto'>
          <div className="flex flex-col md:flex-row bg-white gap-10 rounded-xl py-4 ps-10 pe-5 lg:w-lg ms-auto">
            <div className="flex flex-col gap-1">
              <div className="text-bluewave text-xl font-semibold">Book Appointment</div>
              <div>Book your appointment with a licensed Medicuro doctor at your convenience</div>
            </div>
            <NavLink to="/book-appointment">
              <div className="flex flex-col gap-1 justify-center items-center bg-teal p-4 rounded-xl">
                <img className='w-10' src={plusBtn} alt="" />
                <div className="text-sm whitespace-nowrap">Book Now</div>
              </div>
            </NavLink>
          </div>

          <div className='flex flex-col xl:flex-row gap-4'>
            <div className=' mt-4 pb-5 p-5 max-w-full lg:w-lg rounded-xl bg-teal'>
              <div className="text-white my-4 mb-7 text-xl">Upcoming Appointments</div>
              {
                upcomingAppointments.length ?
                  <Fragment>
                    <Swiper
                      className='whitespace-nowrap overflow-x-hidden'
                      onSwiper={(swiper) => upcomingContainerRef.current = swiper}
                      onSlideChange={(swiper) => setCurrentUpcomingAppointmentPage(swiper.activeIndex)}
                    >
                      {arrayChunk(upcomingAppointments, 2).map((chunk, chunkIndex) => (
                        <SwiperSlide key={`past-${chunkIndex}`} className='inline-block w-full px-1'>
                          <div className='flex flex-col gap-4'>
                            {chunk.map(
                              ({ doctor, service, date, day, time, id }, index) => (
                                <AppointmentItem
                                  key={`${chunkIndex}-${index}`}
                                  buttons={upcomingAppoinmentBtns}
                                  doctor={doctor}
                                  service={service}
                                  date={date}
                                  day={day}
                                  time={time}
                                  showDayTime={true}
                                  id={id}
                                />
                              ),
                            )}
                          </div>
                        </SwiperSlide>
                      ))}

                    </Swiper>
                    <div className='flex justify-center gap-2 my-4'>
                      {arrayChunk(upcomingAppointments, 2).map((chunk, index) => (
                        <div
                          onClick={() => upcomingContainerRef.current?.slideTo(index)}
                          key={`upcoming-dot-${index}`}
                          className={cn(
                            "h-15 w-15 cursor-pointer rounded-circle bg-black",
                            currentUpcomingAppointmentPage === index ? "bg-teal-800" : "bg-white"
                          )}
                        />
                      ))}
                    </div>
                  </Fragment>

                  : isLoading ?
                    <div className='flex-1 flex items-center justify-center'>
                      <img className='w-10' alt='loading' src={spinner} />
                    </div> :
                    <h1> No upcoming appointments </h1>
              }

            </div>
            <div className='bg-ocean w-full lg:w-lg mt-4 pb-5 p-5 rounded-xl min-h-[360px]'>
              <div className="text-white my-4 mb-7 text-xl">Past Appointments</div>
              {
                pastAppointments.length ?
                  <Fragment>
                    <Swiper
                      onSwiper={(swiper) => pastContainerRef.current = swiper}
                      onSlideChange={(swiper) => setCurrentPastAppointmentPage(swiper.activeIndex)}
                      className='whitespace-nowrap overflow-x-hidden'
                    >
                      {arrayChunk(pastAppointments, 3).map((chunk, chunkIndex) => (
                        <SwiperSlide key={`past-${chunkIndex}`} className='inline-block w-full px-1'>
                          <div className='flex flex-col gap-4'>
                            {chunk.map(({ doctor, service, date, id }, index) => (
                              <AppointmentItem
                                key={`past-${chunkIndex}-${index}`}
                                buttons={pastAppointmentBtns}
                                doctor={doctor}
                                service={service}
                                date={date}
                                id={id}
                              />
                            ))}
                          </div>
                        </SwiperSlide>


                      ))}
                    </Swiper>

                    <div className='flex justify-center gap-2 my-4'>
                      {
                        pastAppointments?.length > 2 ?   
                        arrayChunk(pastAppointments, 3).map((_, index) => (
                        <div
                          onClick={() => pastContainerRef.current?.slideTo(index)}
                          key={`past-dot-${index}`}
                          className={cn(
                            "h-15 w-15 cursor-pointer rounded-circle",
                            currentPastAppointmentPage === index ? "bg-sky-cyan" : "bg-white"
                          )}
                        />
                      ))
                        : ""
                      }
                      
                    </div>
                  </Fragment>
                  :
                  isLoading ?
                    <div className=' flex items-center justify-center'>
                      <img className='w-10' src={spinner} />
                    </div>

                    : <h1> No past appointments </h1>


              }

            </div>


          </div>

        </div>

        {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 items-end lg:py-36 my-10 '>
          <div className=' mt-4 pb-5 p-5 rounded-xl bg-teal min-h-455'>
            <div className="text-white my-4 mb-7 text-xl">Upcoming Appointments</div>
            {
              upcomingAppointments.length ? 
                    <Fragment>
                            <Swiper
                              className='whitespace-nowrap overflow-x-hidden'
                              onSwiper={(swiper) => upcomingContainerRef.current = swiper}
                              onSlideChange={(swiper) => setCurrentUpcomingAppointmentPage(swiper.activeIndex)}  
                            >
                              {arrayChunk(upcomingAppointments, 2).map((chunk, chunkIndex) => (
                                <SwiperSlide key={`past-${chunkIndex}`} className='inline-block w-full px-1'>
                                  <div className='flex flex-col gap-4'>
                                    {chunk.map(
                                      ({ doctor, service, date, day, time,id }, index) => (
                                        <AppointmentItem
                                          key={`${chunkIndex}-${index}`}
                                          buttons={upcomingAppoinmentBtns}
                                          doctor={doctor}
                                          service={service}
                                          date={date}
                                          day={day}
                                          time={time}
                                          showDayTime={true}
                                          id={id}
                                        />
                                      ),
                                    )}
                                  </div>
                                </SwiperSlide>
                              ))}

                            </Swiper>

                            <div className='flex justify-center gap-2 my-4'>
                              {arrayChunk(pastAppointments, 2).map((_, index) => (
                                <div
                                  onClick={() => upcomingContainerRef.current?.slideTo(index)}
                                  key={`past-dot-${index}`}
                                  className={cn(
                                    "h-15 w-15 cursor-pointer rounded-circle",
                                    currentUpcomingAppointmentPage === index ? "bg-teal-800" : "bg-white"
                                  )}
                                />
                              ))}
                            </div>
                      </Fragment>
              
              :  isLoading ?  
                      <div className='flex-1 flex items-center justify-center'> 
                                  <img className='w-10' src={spinner} />
                      </div>   : 
                      
                      <h1> No upcoming appointments </h1>
            }
               
          </div>

           <div>
              <div className="flex bg-white gap-10 rounded-xl py-4 ps-10 pe-5">
                  <div className="flex flex-col gap-1">
                    <div className="text-bluewave text-xl font-semibold">Book Appointment</div>
                    <div>Book your appointment with a licensed Medicuro doctor at your convenience</div>
                  </div>
                    <NavLink to="/book-appointment">
                        <div className="flex flex-col gap-1 justify-center items-center bg-teal p-4 rounded-xl">
                          <img className='w-10' src={plusBtn} alt="" />
                          <div className="text-sm whitespace-nowrap">Book Now</div>
                        </div>
                    </NavLink>
              </div>

              <div className='bg-ocean mt-4 pb-5 p-5 rounded-xl min-h-[320px]'>
                <div className="text-white my-4 mb-7 text-xl">Past Appointments</div>
                {
                  pastAppointments.length ? 
                      <Fragment>
                            <Swiper
                                onSwiper={(swiper) => pastContainerRef.current = swiper}
                                onSlideChange={(swiper) => setCurrentPastAppointmentPage(swiper.activeIndex)}  
                                className='whitespace-nowrap overflow-x-hidden'
                            >
                              {arrayChunk(pastAppointments, 3).map((chunk, chunkIndex) => (
                                <SwiperSlide key={`past-${chunkIndex}`} className='inline-block w-full px-1'>
                                  <div className='flex flex-col gap-4'>
                                    {chunk.map(({ doctor, service, date, id }, index) => (
                                      <AppointmentItem
                                        key={`past-${chunkIndex}-${index}`}
                                        buttons={pastAppointmentBtns}
                                        doctor={doctor}
                                        service={service}
                                        date={date}
                                        id={id}
                                      />
                                    ))}
                                  </div>
                                </SwiperSlide>

                                
                              ))}
                            </Swiper>

                            <div className='flex justify-center gap-2 my-4'>
                              {arrayChunk(pastAppointments, 3).map((_, index) => (
                                <div
                                  onClick={() => pastContainerRef.current?.slideTo(index)}
                                  key={`past-dot-${index}`}
                                  className={cn(
                                    "h-15 w-15 cursor-pointer rounded-circle",
                                    currentPastAppointmentPage === index ? "bg-sky-cyan" : "bg-white"
                                  )}
                                />
                              ))}
                            </div>
                      </Fragment>
                    :
                    isLoading ? 
                    <div className=' flex items-center justify-center'> 
                                  <img className='w-10' src={spinner} />
                    </div>
                    
                    : <h1> No past appointments </h1>
                  
                  
                }
                   
              </div>
           </div>
        </div> */}
      </div>
    </div>
  );
}
