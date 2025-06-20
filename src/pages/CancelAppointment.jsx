import { useNavigate, useParams } from 'react-router-dom';
import AppointmentItem from '../components/AppointmentItem';
// book-appointment-vector.png
import sideImage from "../assets/images/book-appointment-vector.png"
import { useAppointmentStore } from '../store/appointments';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { showToast } from '../utils/toast';

function RebookAppointment() {
   const { id } = useParams();
   const navigate = useNavigate();
   
  const {getAppointmentById } = useAppointmentStore()

  const [appointment,setAppointment] = useState()

  useEffect(() => {
     const data = getAppointmentById(id)
     setAppointment(data)
  },[id])

const cancelAppoinment = async  (appointmentId) => {
   try {
    const response = await axiosInstance.post("/api/v1/appointments/cancel",{appointmentId})
    if(response.data?.statusCode == 200){
      showToast.success("Appoinment canceled successfully")
      navigate("/dashboard")
    }
   } catch (error) {
      showToast.error("Something went wrong")
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
                  <div className='text-white my-4 font-semibold text-md'>Cancel Appointments</div>
                    <div className='flex flex-col gap-4 mb-10'>
                        <div className='font-normal'> This is to confirm your request to <span className='font-bold'> cancel </span>  your appointment with { appointment?.doctor}. Please click the <span className='font-bold'>Confirm button</span>  below to proceed.</div>
                        <div>Please note that this action is final and cannot be reversed.</div>
                    </div>
                  
                  <div className='md:max-w-430'>
                    { appointment &&  <AppointmentItem
                                buttons={[{name : "Confirm",action : (index) => cancelAppoinment(index)}]}
                                doctor={appointment?.doctor}
                                service={appointment?.service}
                                date={appointment?.date}
                                day={appointment?.day}
                                time={appointment?.time}
                                showDayTime={true}
                                id={appointment?.id}
                                buttonClasses={"text-black font-bold py-3"}
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