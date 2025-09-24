import { useState, useEffect, Fragment, useRef } from 'react'
import appointmentSideImage from '../../assets/images/book-appointment-vector.png'
import spinner from '../../assets/images/spinner.gif'

import CommonBackBtn from '../../components/CommonBackBtn'
import BookAppointmentItem from './views/BookAppointmentItem'
import axiosInstance from '../../utils/axios'
import DynamicForm from './views/DynamicForm'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../utils/toast'
import { useSocket } from '../../context/socketContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function BookAppointmentIndexPage() {
  const socket = useSocket()
  const navigate = useNavigate()

  const [bookingItems, setBookingItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const swiperRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(
          '/api/v1/services?paginate=false',
        )
        let services = response.data?.services
        services = services?.map((e) => ({ ...e, isSelected: false }))
        setBookingItems(services)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()

    const fetchAgain = () => {
      if (!isSubmitted) {
        fetchServices()
      }
    }

    socket && socket.on('services-updated', fetchAgain)
    return () => {
      socket && socket.off('services-updated', fetchAgain)
    }
  }, [socket])

  const handleSelectItem = (id) => {
    const temp = bookingItems.map((item) =>
      item.id === id
        ? { ...item, isSelected: !item.isSelected }
        : { ...item, isSelected: false },
    )
    setSelectedItemId(id)
    setBookingItems(temp)
  }

  const handleSubmit = () => {
    if (selectedItemId) {
      setIsSubmitted(true)
    } else {
      showToast.error('Please select any service')
    }
  }

  const submitFormCallback = () => {
    setSelectedItemId(null)
    setIsSubmitted(false)
    setBookingItems(
      bookingItems.map((item) => ({ ...item, isSelected: false })),
    )
  }

  // 🔑 utility to chunk items for slides
  function arrayChunk(arr, size) {
    const chunks = []
    for (let i = 0; i < arr?.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  // 🔑 decide grid size based on screen
  const getGridConfig = () => {
    if (window.innerWidth >= 1024) return { rows: 3, cols: 4 } // desktop
    if (window.innerWidth >= 768) return { rows: 4, cols: 2 } // tablet
    return { rows: 4, cols: 1 } // mobile
  }

  const { rows, cols } = getGridConfig()
  const itemsPerSlide = rows * cols
  const bookingChunks = arrayChunk(bookingItems, itemsPerSlide)

  return (
    <div className='bg-ice min-h-[calc(100vh-93px)] w-full justify-between relative md:overflow-hidden'>
      <div className='common-bg'></div>
      <div className='md:py-5 pt-5 md:px-10 lg:ps-4 relative'>
        {isSubmitted ? (
          <CommonBackBtn
            className='px-2'
            label='Back to Services'
            onClick={() => setIsSubmitted(false)}
          />
        ) : (
          <div onClick={() => navigate('/dashboard')}>
            <CommonBackBtn
              className='mb-5 px-2'
              label='Back to Dashboard'
              link='/dashboard'
            />
          </div>
        )}

        <div className='flex items-start justify-around container m-auto'>
          <img
            className='left-image md:mt-10'
            src={appointmentSideImage}
            alt=''
          />
          <div className='bg-ocean md:px-5 md:py-8 md:p-5 py-4 md:rounded-xl w-full max-w-[756px]'>
            {selectedItemId && isSubmitted ? (
              <div className='text-white'>
                <div className='hidden md:flex'>
                  <CommonBackBtn
                    varient='white'
                    className='mb-5 px-2'
                    label='Back to Services'
                    onClick={() => setIsSubmitted(false)}
                  />
                </div>
                <div className='text-xl gap-3 relative mb-3 font-normal md:w-max md:max-w-[350px] whitespace-break-spaces ps-5'>
                  <div>
                    {bookingItems.find((e) => e.id == selectedItemId)?.name}
                  </div>
                  {bookingItems.find((e) => e.id == selectedItemId)
                    ?.isFeesApply && (
                    <div className='text-white absolute right-0 gap-1 flex font-bold items-center text-sm'>
                      <div className='text-xl'>&#43;</div>
                      <div>fees apply</div>
                    </div>
                  )}
                </div>
                <div className='text-sm px-5'>
                  {bookingItems.find((e) => e.id == selectedItemId)?.desc}
                </div>
              </div>
            ) : (
              <div className='text-white px-5'>
                <div className='text-xl mb-3'>Select Service</div>
                <div className='text-sm'>
                  Due to increased demand, it may not be possible for our <br />
                  scheduling team to respond to all requests within 24 hours.
                </div>
              </div>
            )}

            {isLoading ? (
              <div className='flex items-center justify-center my-10'>
                <img src={spinner} alt='Loading' className='w-10 h-10' />
              </div>
            ) : !selectedItemId || !isSubmitted ? (
              bookingItems?.length ? (
                <div className='mt-5 mb-5 px-5'>
                  <Swiper
                    className='whitespace-nowrap overflow-x-hidden'
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) =>
                      setCurrentPage(swiper.activeIndex)
                    }
                  >
                    {bookingChunks.map((chunk, chunkIndex) => (
                      <SwiperSlide
                        key={`booking-${chunkIndex}`}
                        className='inline-block w-full px-1'
                      >
                        <div
                          className='grid gap-4 lg:max-h-[400px] lg:overflow-auto'
                          style={{
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${rows}, auto)`,
                          }}
                        >
                          {chunk.map(
                            ({ name, isFeesApply, isSelected, id }, index) => (
                              <BookAppointmentItem
                                id={id}
                                onClick={handleSelectItem}
                                isSelected={isSelected}
                                name={name}
                                key={`${chunkIndex}-${index}`}
                                isFeesApply={isFeesApply}
                              />
                            ),
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* dots */}
                  <div className='flex justify-center gap-2 my-4'>
                    {bookingChunks.length > 1 &&
                      bookingChunks.map((_, index) => (
                        <div
                          key={`dot-${index}`}
                          onClick={() => swiperRef.current?.slideTo(index)}
                          className={`h-3 w-3 cursor-pointer rounded-full ${
                            currentPage === index ? 'bg-sky-cyan' : 'bg-white'
                          }`}
                        ></div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className='text-white my-10 text-xl'>
                  No service available at this moment
                </div>
              )
            ) : (
              <div className='md:mt-10 mt-7 px-5'>
                <DynamicForm
                  item={bookingItems.find((e) => e.id == selectedItemId)}
                  serviceId={
                    bookingItems.find((e) => e.id == selectedItemId)?.id
                  }
                  callback={() => submitFormCallback()}
                />
              </div>
            )}

            {(!selectedItemId || !isSubmitted) && (
              <div className='md:text-end text-center'>
                <button className='common-btn' onClick={handleSubmit}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointmentIndexPage
