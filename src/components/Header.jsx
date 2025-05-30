import { NavLink } from 'react-router-dom'
import dummyProfile from '../assets/images/dummy-profile.png'
import { useAuthStore } from '../store/auth';


function Header({setOpenMenu}) {

  const {user} = useAuthStore()

  return (
    <div className='md:h-93 md:ps-90 bg-white md:pt-5 md:pb-10'>
      <div className='md:hidden  flex justify-between items-center px-3 py-2'>
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

        <div className='md:flex flex-col bg-navy py-4 px-10 rounded-xl hidden'>
          <div className=' text-white'>Next appointment</div>
          <div className='text-sky-cyan leading-4 '>
            WED, MAR 11, 2025 - 10:45AM
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
