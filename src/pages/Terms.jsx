import { useState } from "react"
import axiosInstance from "../utils/axios"
import { useAuthStore } from "../store/auth"
import { Link, useNavigate } from "react-router-dom"
import { getFirebaseToken } from "../utils/firebaseConfig"



const Terms = ({ setStep, signUpFormValues,withButton=false }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { login, user } = useAuthStore()

  const navigate = useNavigate()

  const submitSignUpForm = async () => {

    try {
      setIsLoading(true);
       let notificationToken = "";

      try {
        if (Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            notificationToken = await getFirebaseToken();
          }
        } else {
          notificationToken = await getFirebaseToken();
        }
        
      } catch (error) {
      }


      const response = await axiosInstance.post('/api/v1/auth/register', {
        ...signUpFormValues,
         ...(notificationToken ? {notificationTokens : notificationToken} : {}) ,
      })
      if (response?.data?.statusCode == 201) {
        const user = response.data?.user
        login({ user })
        navigate("/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className='mb-5 text-center'>
        <div>By continuing, you agree to </div>
        {user?.fullName}
        <div>
          <span className='text-bluewave font-bold'>Terms of Use </span> and{' '}
          <span className='text-bluewave font-bold cursor-pointer'> <Link to={"/privacy"}> Privacy Policy. </Link> </span>
        </div>
      </div>

      <div className='text-sm mt-14'>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Praesent pellentesque congue
        lorem, vel tincidunt tortor placerat a. Proin ac diam
        quam. Aenean in sagittis magna, ut feugiat diam.
        Fusce a scelerisque neque, sed accumsan metus.
      </div>

      <div className='mt-4 mb-3 text-sm'>
        Nunc auctor tortor in dolor luctus, quis euismod
        urna tincidunt. Aenean arcu metus, bibendum at
        rhoncus at, volutpat ut lacus. Morbi pellentesque
        malesuada eros semper ultrices. Vestibulum
        lobortis enim vel neque auctor, a ultrices ex
        placerat. Mauris ut lacinia justo, sed suscipit tortor.
        Nam egestas nulla posuere neque tincidunt porta.
      </div>

      <div className='text-navy font-bold my-3 text-xl mx-3'>
        Terms & Conditions
      </div>
      <ul className='mx-3'>
        <li className='list-decimal text-sm'>
          Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada
          eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex
          nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis
          rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget
          rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus
          ac turpis.
        </li>
      </ul>

      {
        withButton && 
                        <div className='text-center mt-4'>
                            <button
                            disabled={isLoading}
                            className="common-btn my-4 cursor-pointer font-outfit w-full md:w-auto"
                            onClick={() => submitSignUpForm()}
                            >
                            Accept
                            </button>
                        </div>
      }

    </div>
  )
}

export default Terms