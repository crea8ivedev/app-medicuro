import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import AppointmentItem from '../components/AppointmentItem'
import sideImage from '../assets/images/book-appointment-vector.png'
import axiosInstance from '../utils/axios'
import { useAppointmentStore } from '../store/appointments'
import spinner from '/spinner.gif'
import { useSocket } from '../context/socketContext'
import { showToast } from '../utils/toast'

function ViewAppointment() {
  const { id, type } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()

  const { getAppointmentById } = useAppointmentStore()
  const [appointment, setAppointment] = useState()
  const [fields, setFields] = useState(null)

  useEffect(() => {
    const data = getAppointmentById(id)
    setAppointment(data)

    const fetchFormData = async () => {
      try {
        const response = await axiosInstance.post(`/api/v1/appointments/view`, {
          appointmentId: id,
        })

        const data = response.data
        if (data?.statusCode === 200) {
          setFields(data?.appointment?.appointmentRequest?.formData)
        }
      } catch (error) {}
    }
    fetchFormData()

    const navigateToDashboard = (appointmentId) => {
      if (appointmentId == id) {
        showToast.error('This appointment was canceled by admin')
        navigate('/dashboard')
      }
    }

    const refetchForm = (appointmentId) => {
      if (appointmentId == id) fetchFormData()
    }

    socket && socket.on('cancel-appointments-list', navigateToDashboard)
    socket && socket.on('update-appointments-list', (id) => refetchForm(id))

    return () => {
      socket && socket.off('cancel-appointments-list', navigateToDashboard)
      socket && socket.off('update-appointments-list', refetchForm)
    }
  }, [id, socket])

  const buttons = [
    {
      name: 'Rebook',
      action: (index) => navigate(`/rebook-appointment/${index}`),
    },
    {
      name: 'Cancel',
      action: (index) => navigate(`/cancel-appointment/${index}`),
    },
  ]

  return (
    <div className='bg-ice min-h-[calc(100dvh-64px)] md:min-h-auto 2xl:min-h-[calc(100dvh-93px)] w-full justify-between relative'>
      <div className='common-bg absolute left-0 right-0 bg-bottom'></div>

      <div className='container mx-auto min-h-[calc(100dvh-64px)] md:min-h-auto 2xl:min-h-[calc(100dvh-93px)] flex items-center justify-around relative'>
        <img className='left-image' src={sideImage} alt='left-image' />
        <div className='bg-teal max-w-550 min-w-[90%] sm:min-w-550 max-h-max mt-4 md:px-10 px-5 rounded-xl'>
          <div className='text-white mt-4 mb-5 text-xl'>{type} Appointment</div>
          {appointment ? (
            <AppointmentItem
              buttons={type !== 'Past' ? buttons : []}
              doctor={appointment?.doctor}
              service={appointment?.service}
              date={appointment?.date}
              day={appointment?.day}
              time={appointment?.time}
              showDayTime={true}
              id={appointment?.id}
            />
          ) : (
            <div className='flex items-center justify-center'>
              <img className='w-10' src={spinner} />
            </div>
          )}

          <div className='appointment-bg my-4 flex bg-foam flex-col gap-5 p-5 rounded-xl min-h-320'>
            {fields ? (
              Object.entries(fields).map(([label, value], index) => {
                const isImageArray =
                  Array.isArray(value) &&
                  value.every(
                    (item) =>
                      typeof item === 'string' &&
                      (item.startsWith('http') || item.startsWith('/')) &&
                      (item.endsWith('.jpg') ||
                        item.endsWith('.jpeg') ||
                        item.endsWith('.png') ||
                        item.endsWith('.webp') ||
                        item.endsWith('.gif')),
                  )
                return (
                  <div key={index}>
                    <div className='font-bold'>{label}</div>
                    {isImageArray ? (
                      <div className='flex my-3 flex-wrap gap-2'>
                        {value.map((item, idx) => (
                          <a href={item} target='_blank' key={idx}>
                            <img
                              className='w-[50px] cursor-pointer'
                              src={item}
                            />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div>{value}</div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className='min-h-320 flex items-center justify-center'>
                <img className='w-10' src={spinner} />
              </div>
            )}
          </div>

          <div className='md:text-end text-center'>
            <NavLink to={'/dashboard'}>
              <button className='bg-bluewave text-white px-10 py-4 rounded-md cursor-pointer my-5 hover:opacity-90 hover:bg-white hover:text-bluewave border-2 border-bluewave'>
                Back to Dashboard
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAppointment
