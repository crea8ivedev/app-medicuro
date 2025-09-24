import { useState, useEffect } from 'react'
import appointmentSideImage from '../../assets/images/book-appointment-vector.png'
import spinner from '../../assets/images/spinner.gif'

import CommonBackBtn from '../../components/CommonBackBtn'
import BookAppointmentItem from './views/BookAppointmentItem'
import axiosInstance from '../../utils/axios'
import DynamicForm from './views/DynamicForm'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../utils/toast'
import { useSocket } from '../../context/socketContext'
import ServiceListFallback from '../fallbacks/ServiceListFallback'

// main testing

function BookAppointmentIndexPage() {
  const socket = useSocket()

  const navigate = useNavigate()

  const [bookingItems, setBookingItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(
          '/api/v1/services?paginate=false',
        )
        let services = response.data?.services

        services = services?.map((e) => {
          return { ...e, isSelected: false }
        })
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
    const temp = bookingItems.map((item) => {
      if (item.id === id) {
        setSelectedItemId(id)
        return { ...item, isSelected: !item.isSelected }
      } else {
        return { ...item, isSelected: false }
      }
    })
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
    const temp = bookingItems.map((item) => {
      {
        return { ...item, isSelected: false }
      }
    })
    setBookingItems(temp)
  }

  return (
    <div className='bg-ice min-h-screen  w-full justify-between relative'>
      <div className='common-bg'></div>
      <div className='md:py md:py-5 pt-5 md:px-10   lg:ps-4  relative'>
        {isSubmitted ? (
          <CommonBackBtn
            className=' px-2'
            label='Back to Services'
            onClick={() => setIsSubmitted(false)}
          />
        ) : (
          <div onClick={() => navigate('/dashboard')}>
            <CommonBackBtn
              className=' mb-5 px-2'
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
          <div className='bg-ocean md:px-5 md:py-8 md:p-5 py-4 md:rounded-xl w-[756px]'>
            {selectedItemId && isSubmitted ? (
              <div className='text-white'>
                <div className='hidden md:flex'>
                  <CommonBackBtn
                    varient='white'
                    className=' mb-5 px-2'
                    label='Back to Services'
                    onClick={() => setIsSubmitted(false)}
                  />
                </div>
                <div className='text-xl gap-3 relative mb-3 font-normal md:w-max md:max-w-[350px] whitespace-break-spaces ps-5'>
                  <div>
                    {
                      bookingItems.find((e) => e.id == selectedItemId)?.name
                    }{' '}
                  </div>
                  {bookingItems.find((e) => e.id == selectedItemId)
                    ?.isFeesApply ? (
                    <div className='text-white absolute  md:bottom-[unset]  md:top-0 md:bottom right-0  md:-right-[100px]  gap-1 flex font-bold  items-center text-sm'>
                      {' '}
                      <div className='text-xl'>&#43;</div>
                      <div>fees apply</div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='text-sm px-5'>
                  {bookingItems.find((e) => e.id == selectedItemId)?.desc}
                </div>
              </div>
            ) : (
              <div className='text-white  px-5'>
                <div className='text-xl mb-3 '>Select Service</div>
                <div className='text-sm'>
                  Due to increased demand, it may not be possible for our <br />{' '}
                  scheduling team to respond to all requests within 24 hours.
                </div>
              </div>
            )}

            {isLoading ? (
              <ServiceListFallback />
            ) : !selectedItemId || !isSubmitted ? (
              bookingItems?.length ? (
                <div className='flex flex-col gap-4 mt-10  mb-10 px-5 '>
                  <div className='text-white flex font-bold gap-2 items-center'>
                    {' '}
                    <div className='text-xl'>&#43;</div> <div>fees apply</div>
                  </div>

                  <div className='grid max-h-[425px]  overflow-auto hide-scrollbar sm:grid-cols-2 lg:grid-cols-4 gap-2 pe-4 md:pe-0'>
                    {bookingItems.map(
                      ({ name, isFeesApply, isSelected, id }, index) => {
                        return (
                          <BookAppointmentItem
                            id={id}
                            onClick={handleSelectItem}
                            isSelected={isSelected}
                            name={name}
                            key={index}
                            isFeesApply={isFeesApply}
                          />
                        )
                      },
                    )}
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
                <button className='common-btn' onClick={() => handleSubmit()}>
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
