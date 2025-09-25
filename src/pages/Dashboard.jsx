import { Fragment, useEffect, useRef, useState } from 'react'
import loginSideImg from '../assets/images/login-vector.png'
import AppointmentItem from '../components/AppointmentItem'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../utils/cn'
import { Swiper, SwiperSlide } from 'swiper/react'
import axiosInstance from '../utils/axios'
import { useAppointmentStore } from '../store/appointments'
import spinner from '../assets/images/spinner.gif'
import { useSocket } from '../context/socketContext'
import 'swiper/css'
import NoAppointmentItem from '../components/NotificationItem'
import { CirclePlus } from 'lucide-react'

export default function Dashboard() {
  const {
    upcomingAppointments,
    pastAppointments,
    pendingRequests,
    setAppointments,
    setPendingRequests,
    clearAppointments,
  } = useAppointmentStore()

  const socket = useSocket()

  const upcomingContainerRef = useRef(null)
  const pastContainerRef = useRef(null)

  const [isLoading, setIsloading] = useState(false)
  const [currentUpcomingAppointmentPage, setCurrentUpcomingAppointmentPage] =
    useState(0)
  const [currentPastAppointmentPage, setCurrentPastAppointmentPage] =
    useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsloading(true)
        const response = await axiosInstance.get('/api/v1/appointments')
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

    const fetchPendingRequests = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/appointments/pending')
        if (response.status == 200) {
          setPendingRequests(response.data.data || [])
        } else {
          setPendingRequests([])
        }
      } catch (error) {
        setPendingRequests([])
      }
    }

    fetchAppointments()
    fetchPendingRequests()

    socket.on('update-appointments-list', fetchAppointments)
    socket.on('cancel-appointments-list', fetchAppointments)
    socket.on('update-pending-requests', fetchPendingRequests)

    return () => {
      socket && socket.off('update-appointments-list', fetchAppointments)
      socket.off('cancel-appointments-list', fetchAppointments)
      socket.off('update-pending-requests', fetchPendingRequests)
    }
  }, [])

  //

  const ViewpastAppoinments = (id) => {
    navigate(`/view-appointment/Past/${id}`)
  }

  const pastAppointmentBtns = [{ name: 'View', action: ViewpastAppoinments }]

  const upcomingAppoinmentBtns = [
    {
      name: 'View',
      action: (id) => navigate(`/view-appointment/Upcoming/${id}`),
    },
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

  const noUpcomingAppointmentItem = {
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    title: 'No upcoming appointment',
    desc: 'You currently have no upcoming appointments. This section will display details of your scheduled appointments once they are booked. Please check back regularly for updates.',
    id: 'sample-id-1',
  }

  return (
    <div className='bg-ice px-3 py-5 md:py-0 min-h-screen w-full justify-between relative'>
      <div className='common-bg absolute left-0  bottom-100 bg-bottom'></div>
      <div className='container mx-auto md:py-24  flex items-center justify-between relative md:px-5'>
        <img className='left-image' src={loginSideImg} alt='left-image' />
        <div className='max-w-full m-auto'>
          <div className='flex flex-col md:flex-row bg-white gap-10 rounded-xl py-4  ps-5 pe-5 lg:w-[495px] ms-auto'>
            <div className='flex flex-col gap-1'>
              <div className='text-bluewave text-xl font-semibold'>
                Book Appointment
              </div>
              <div>
                Book your appointment with a licensed Medicuro doctor at your
                convenience
              </div>
            </div>
            <NavLink to='/book-appointment'>
              <div className='flex flex-col gap-1 justify-center items-center bg-teal border-2 border-teal p-4 rounded-xl hover:bg-white hover:border-2 border-bg-teal'>
                {/* <img className='w-10' src={plusBtn} alt='' /> */}
                <CirclePlus size={45} className='w-10' />
                <div className='text-sm whitespace-nowrap'>Book Now</div>
              </div>
            </NavLink>
          </div>

          <div className='flex flex-col xl:flex-row gap-4'>
            <div className=' mt-4 pb-5 p-5 max-w-full lg:w-lg rounded-xl bg-teal'>
              <div className='text-white my-4 mb-7 text-xl'>
                Upcoming Appointments
              </div>
              {upcomingAppointments.length ? (
                <Fragment>
                  <Swiper
                    className='whitespace-nowrap overflow-x-hidden'
                    onSwiper={(swiper) =>
                      (upcomingContainerRef.current = swiper)
                    }
                    onSlideChange={(swiper) =>
                      setCurrentUpcomingAppointmentPage(swiper.activeIndex)
                    }
                  >
                    {arrayChunk(upcomingAppointments, 2).map(
                      (chunk, chunkIndex) => (
                        <SwiperSlide
                          key={`past-${chunkIndex}`}
                          className='inline-block w-full px-1'
                        >
                          <div className='flex flex-col gap-4'>
                            {chunk.map(
                              (
                                { doctor, service, date, day, time, id },
                                index,
                              ) => (
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
                      ),
                    )}
                  </Swiper>
                  <div className='flex justify-center gap-2 my-4'>
                    {upcomingAppointments?.length > 2 &&
                      arrayChunk(upcomingAppointments, 2).map(
                        (chunk, index) => (
                          <div
                            onClick={() =>
                              upcomingContainerRef.current?.slideTo(index)
                            }
                            key={`upcoming-dot-${index}`}
                            className={cn(
                              'h-15 w-15 cursor-pointer rounded-circle bg-black',
                              currentUpcomingAppointmentPage === index
                                ? 'bg-teal-800'
                                : 'bg-white',
                            )}
                          />
                        ),
                      )}
                  </div>
                </Fragment>
              ) : isLoading ? (
                <div className='flex-1 flex items-center justify-center'>
                  <img className='w-10' alt='loading' src={spinner} />
                </div>
              ) : (
                <NoAppointmentItem
                  title={noUpcomingAppointmentItem.title}
                  desc={noUpcomingAppointmentItem.desc}
                  date={noUpcomingAppointmentItem.date}
                  deletable={false}
                />
              )}
            </div>
            <div className='bg-ocean w-full 2xl:w-[495px] lg:w-lg mt-4 pb-5 p-5 rounded-xl min-h-[360px]'>
              <div className='text-white my-4 mb-7 text-xl'>
                Past Appointments
              </div>
              {pastAppointments.length ? (
                <Fragment>
                  <Swiper
                    onSwiper={(swiper) => (pastContainerRef.current = swiper)}
                    onSlideChange={(swiper) =>
                      setCurrentPastAppointmentPage(swiper.activeIndex)
                    }
                    className='whitespace-nowrap overflow-x-hidden'
                  >
                    {arrayChunk(pastAppointments, 3).map(
                      (chunk, chunkIndex) => (
                        <SwiperSlide
                          key={`past-${chunkIndex}`}
                          className='inline-block w-full px-1'
                        >
                          <div className='flex flex-col gap-4'>
                            {chunk.map(
                              ({ doctor, service, date, id }, index) => (
                                <AppointmentItem
                                  key={`past-${chunkIndex}-${index}`}
                                  buttons={pastAppointmentBtns}
                                  doctor={doctor}
                                  service={service}
                                  date={date}
                                  id={id}
                                />
                              ),
                            )}
                          </div>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>

                  <div className='flex justify-center gap-2 my-4'>
                    {pastAppointments?.length > 2
                      ? arrayChunk(pastAppointments, 3).map((_, index) => (
                          <div
                            onClick={() =>
                              pastContainerRef.current?.slideTo(index)
                            }
                            key={`past-dot-${index}`}
                            className={cn(
                              'h-15 w-15 cursor-pointer rounded-circle',
                              currentPastAppointmentPage === index
                                ? 'bg-sky-cyan'
                                : 'bg-white',
                            )}
                          />
                        ))
                      : ''}
                  </div>
                </Fragment>
              ) : isLoading ? (
                <div className=' flex items-center justify-center'>
                  <img className='w-10' src={spinner} />
                </div>
              ) : (
                <h1> No past appointments </h1>
              )}
            </div>
          </div>

          <div className='bg-ocean w-full lg:w-lg mt-4 pb-5 p-5 rounded-xl min-h-[360px]'>
            <div className='text-white my-4 mb-7 text-xl'>Pending Requests</div>
            {pendingRequests.length ? (
              <Fragment>
                <Swiper
                  onSwiper={(swiper) => (pastContainerRef.current = swiper)}
                  onSlideChange={(swiper) =>
                    setCurrentPastAppointmentPage(swiper.activeIndex)
                  }
                  className='whitespace-nowrap overflow-x-hidden'
                >
                  {arrayChunk(pendingRequests, 5).map((chunk, chunkIndex) => (
                    <SwiperSlide
                      key={`pending-${chunkIndex}`}
                      className='inline-block w-full px-1'
                    >
                      <div className='flex flex-col gap-4'>
                        {chunk.map(
                          ({ formData, createdAt, id, service }, index) => (
                            <AppointmentItem
                              key={`pending-${chunkIndex}-${index}`}
                              buttons={[]}
                              doctor={service?.name} // no doctor in pending API
                              service={`${formData?.reason?.substring(0, 100)}...`}
                              date={new Date(createdAt).toDateString()} // ✅ format date
                              id={id}
                            />
                          ),
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className='flex justify-center gap-2 my-4'>
                  {pendingRequests?.length > 2 &&
                    arrayChunk(pendingRequests, 5).map((_, index) => (
                      <div
                        onClick={() => pastContainerRef.current?.slideTo(index)}
                        key={`pending-dot-${index}`}
                        className={cn(
                          'h-15 w-15 cursor-pointer rounded-circle',
                          currentPastAppointmentPage === index
                            ? 'bg-sky-cyan'
                            : 'bg-white',
                        )}
                      />
                    ))}
                </div>
              </Fragment>
            ) : isLoading ? (
              <div className=' flex items-center justify-center'>
                <img className='w-10' src={spinner} />
              </div>
            ) : (
              <h1>No pending requests</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
