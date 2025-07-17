import { useState } from 'react'
import MedicuroLogo from '../../assets/images/medicuro-logo-icon-white.png'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios'
import { cn } from '../../utils/cn'
import { useAuthStore } from '../../store/auth'
import { showToast } from '../../utils/toast'

export default function DeleteAccount() {

  const [isLoading,setIsLoading] = useState(false)
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [sendData,setsendData] = useState(false)

  const handleChange = (e) => {
    setsendData(e.checked)
  }
  
  const deleteACcount = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.post("/api/v1/auth/profile/delete",{sendData})
        if(response.data?.statusCode == 200){
            logout()
            showToast.success("Your account has been successfully deleted.")
            navigate("/login")
        }
    } finally {
      setIsLoading(false)
    }
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

      <div className='max-w-sm'>
          Deleting your account will permanently remove all personal information, medical history, and appointment records. This action is final and cannot be reversed. Please proceed with caution.
      </div>
      <div className='flex flex-col gap-4'>
        <Link
          to='/login'
          className='py-2.5 px-10 text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit hover:bg-bluewave hover:text-white'
        >
          Cancel
        </Link>
        <button
          to='signup'
          disabled={isLoading}
          className={cn("py-2.5 px-10  text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit hover:bg-bluewave hover:text-white",isLoading && "opacity-70 cursor-not-allowed")}
          onClick={deleteACcount}
        >
          Delete
        </button>
      </div>

      <div className='flex gap-4'>
        <div><input type="checkbox" onChange={(e) => handleChange(e.target)} className='scale-150 outline-none' /></div>
        <div className='text-sm text-start'>Send me a copy of my data and usage history</div>
      </div>
    </div>
  )
}
