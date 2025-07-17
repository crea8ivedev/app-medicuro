
import {useState} from "react"
import MedicuroLogo from '../../assets/images/medicuro-logo-icon-white.png'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'
import { useAuthStore } from '../../store/auth'
import { cn } from '../../utils/cn';
import { showToast } from "../../utils/toast"


export default function Logout() {
  const navigate = useNavigate()
  const { logout:logoutUser } = useAuthStore();
  const [loading,setLoading] = useState(false)
  const [sendData,setsendData] = useState(false)


  const handleChange = (e) => {
    setsendData(e.checked)
  }


  const logout = async () => {
    try {
      setLoading(true)
      const response = await  axiosInstance.post('/api/v1/auth/logout',{sendData})
      if(response.data.statusCode == 200){
        logoutUser()
        navigate("/")

        if(sendData){
          showToast.success("Your data has been sent to your email address.")
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative z-10 min-h-full flex flex-col justify-center items-center text-white space-y-6 text-center px-2'>
      <div>
        <img src={MedicuroLogo} className='w-100 mx-auto  mb-2' alt="logo" />
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
          className='py-2.5 px-10 text-center hover:bg-bluewave hover:text-white text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit'
        >
          Cancel
        </Link>
        <button
          onClick={logout}
          to='signup'
          className={cn("py-2.5 px-10 hover:bg-bluewave hover:text-white  text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit",loading && "opacity-70 cursor-not-allowed")}
        >
          Logout
        </button>
      </div>

      <div className='flex items-center gap-4 mt-20'>
        <input type="checkbox" onChange={(e) => handleChange(e.target)} className='scale-150 outline-0 border-0 hover:outline-0 hover:border-0' />
        <div className='text-sm text-start'>Send me a copy of my data and usage history</div>
      </div>
    </div>
  )
}
