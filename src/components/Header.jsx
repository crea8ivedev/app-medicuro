import { NavLink, useNavigate } from 'react-router-dom'
import dummyProfile from '../assets/images/dummy-profile.png'
import { useAuthStore } from '../store/auth';
import { useEffect, useState } from 'react';
import axiosInstance from "../utils/axios"
import { useAppointmentStore } from '../store/appointments';

function Header({setOpenMenu}) {

  const {user} = useAuthStore()
  const [nextAppointment,setNextAppointment] = useState(null)
  const navigate = useNavigate()
  const {upcomingAppointments} = useAppointmentStore()

  useEffect(() => {
    const fetchData = async () => {
        try {
              const response = await axiosInstance.post("/api/v1/appointments/upcoming")
              if(response.data?.statusCode == 200){
                const data = response.data?.firstUpcomingAppointment
                  setNextAppointment(data)
              }
            } catch (error) {
        
            }
      
      }
      fetchData()
  },[upcomingAppointments])

  return (
    <div className='md:h-93 md:ps-90 bg-white md:py-5  flex items-center'>
      <div className='md:hidden w-full  flex justify-between items-center px-3 py-2'>
        <div className='text-5xl cursor-pointer' onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(true)
        }}>&#8801;</div>
        <NavLink to={"/profile"}><img src={dummyProfile} alt="" />  </NavLink>
      </div>

      <div className='md:flex gap-14 hidden'>
        <div className='flex flex-col py-4'>
          <div className='text-sky'>Hi, Welcome Back</div>
          <div className='font-semibold leading-4 '>{user?.fullName}</div>
        </div>

        {
          nextAppointment &&  <div onClick={() => navigate(`/view-appointment/Upcoming/${nextAppointment?.id}`) } className='md:flex flex-col bg-navy py-4 px-10 rounded-xl hidden cursor-pointer'>
            <div className=' text-white font-light'>Next appointment</div>
            <div className='text-sky-cyan leading-4 font-light'>
              { nextAppointment?.date }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Header
