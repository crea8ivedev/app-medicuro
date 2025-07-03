import MedicuroLogo from '../../assets/images/medicuro-logo-icon-white.png'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'
import { useAuthStore } from '../../store/auth'

export default function Logout() {
  const navigate = useNavigate()
  const { logout:logoutUser } = useAuthStore();
  const logout = async () => {
    const response = await  axiosInstance.post('/api/v1/auth/logout')
    if(response.data.statusCode == 200){
      logoutUser()
      navigate("/")
    }
    console.log(response.data.statusCode)
  }

  return (
    <div className='relative z-10 min-h-full flex flex-col justify-center items-center text-white space-y-6 text-center px-2'>
      <div>
        <img src={MedicuroLogo} className='w-100 mx-auto  mb-2' />
        <h1 className='text-4xl font-bold uppercase font-roboto-cond'>
          {' '}
          MEDICURO
        </h1>
        <h6 className='capitalize text-sm leading-1'>NL’s Trusted Virtual Clinic</h6>
      </div>

      <div className='max-w-sm'> Are you sure you want to log out?</div>
      <div className='flex flex-col gap-4'>
        <Link
          to='/login'
          className='py-2.5 px-10 text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit'
        >
          Cancel
        </Link>
        <div
          onClick={logout}
          to='signup'
          className='py-2.5 px-10  text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit'
        >
          Logout
        </div>
      </div>

      <div className='flex items-center gap-4 mt-20'>
        <input type="checkbox" className='scale-150 outline-0' />
        <div className='text-sm text-start'>Send me a copy of my data and usage history</div>
      </div>
    </div>
  )
}
