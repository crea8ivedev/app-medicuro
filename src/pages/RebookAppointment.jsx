import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import AppointmentItem from '../components/AppointmentItem';
// book-appointment-vector.png
import sideImage from "../assets/images/book-appointment-vector.png"
import { useAppointmentStore } from '../store/appointments';
import axiosInstance from '../utils/axios';
import { showToast } from '../utils/toast';

function RebookAppointment() {
   const { id } = useParams();

   const {getAppointmentById } = useAppointmentStore()
   
     const [appointment,setAppointment] = useState()
     const [loading, setLoading] = useState(false)
   
     useEffect(() => {
        const data = getAppointmentById(id)
        setAppointment(data)
     },[id])

      const rebookAppoinment =  async (appointmentId) => {
          try {
            setLoading(true)
            const response = await axiosInstance.post("/api/v1/appointments/rebook",{appointmentId})
            if(response.status == 201){
              showToast.success("Appointment rebooked successfully")
            }
          } catch (error) {
            showToast.error("Something went wrong")
          } finally {
            setLoading(false)
          }
      }

  return (
  <div className='bg-ice h-screen w-full justify-between relative'>
      <div className='common-bg'></div>

      <div className='container mx-auto h-screen  flex items-center justify-around relative'>
        <img className='left-image' src={sideImage} alt='' />

          <div>
            <div className='bg-teal max-w-650   max-h-max mt-4 pt-10 md:px-10 px-5   pb-24 rounded-xl'>
              
              <div className='max-w-500'>
                  <div className='text-white my-4 font-semibold text-md'>Rebook Appointments</div>
                    <div className='flex flex-col gap-4 mb-10'>
                        <div> This is to confirm your request to <span className='font-bold'> rebook </span>  your appointment with  {appointment?.doctor}. Please click the <span className='font-bold'>Confirm button</span>  below to proceed.</div>
                        <div>Please note that this action is final and cannot be reversed.</div>
                    </div>
                  <div className='md:max-w-430'>
                    { appointment &&  <AppointmentItem
                                buttons={[{name : "Confirm",action : (index) => rebookAppoinment(index)}]}
                                doctor={appointment?.doctor}
                                clinic={appointment?.clinic}
                                date={appointment?.date}
                                day={appointment?.day}
                                time={appointment?.time}
                                showDayTime={true}
                                id={appointment?.id}
                                buttonClasses={"text-black font-bold py-3"}
                                isLoading={loading}
                                
                              />}
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default RebookAppointment