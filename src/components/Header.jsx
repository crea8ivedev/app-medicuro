import { NavLink, useNavigate } from 'react-router-dom'
import dummyProfile from '../assets/images/medicuro-logo.png'
import { useAuthStore } from '../store/auth'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { useAppointmentStore } from '../store/appointments'
import { Menu } from 'lucide-react'

function Header({ setOpenMenu }) {
  const { user } = useAuthStore()
  const [nextAppointment, setNextAppointment] = useState(null)
  const navigate = useNavigate()
  const { upcomingAppointments } = useAppointmentStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          '/api/v1/appointments/upcoming',
        )
        if (response.data?.statusCode == 200) {
          const data = response.data?.firstUpcomingAppointment
          setNextAppointment(data)
        }
      } catch (error) {}
    }
    fetchData()
  }, [upcomingAppointments])

  return (
    <div className='fixed w-full flex justify-start h-16 items-center top-0 md:static md:h-93 md:ps-90 bg-white md:py-5 z-50'>
      <div className='md:hidden w-full flex justify-between items-center px-[10px]'>
        <div
          className='cursor-pointer flex items-center justify-center'
          onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(true)
          }}
        >
          <Menu size={28} />
        </div>
        <NavLink to={'/profile'}>
          <img
            src={user?.profilePic ?? dummyProfile}
            alt='profile-image'
            className='max-w-10 object-cover aspect-square rounded-circle'
          />{' '}
        </NavLink>
      </div>

      <div className='md:flex gap-14 hidden'>
        <div className='flex flex-col py-4'>
          <div className='text-sky'>Hi, Welcome Back</div>
          <div className='font-semibold leading-4 '>{user?.fullName}</div>
        </div>

        {nextAppointment && (
          <div
            onClick={() =>
              navigate(`/view-appointment/Upcoming/${nextAppointment?.id}`)
            }
            className='md:flex flex-col bg-navy py-4 px-10 rounded-xl hidden cursor-pointer hover:opacity-90 hover:bg-white group hover:border-navy  border-navy  border-2 hover:border-2 hover:text-black'
          >
            <div className=' text-white font-light group-hover:text-black group-hover:font-semibold'>
              Next appointment
            </div>
            <div className='text-sky-cyan leading-4 font-light group-hover:text-navy group-hover:font-semibold'>
              {nextAppointment?.date}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
