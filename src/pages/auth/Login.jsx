import { useState } from 'react'
import Container from '../../components/Container'
import loginSideImg from '../../assets/images/login-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'

import facebookLoginIcon from '../../assets/images/facebook-login.png'
import googleLoginIcon from '../../assets/images/google-login.png'
import fingerprintLoginIcon from '../../assets/images/fingerprint-login.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup"
import axiosInstance from '../../utils/axios'
import { useAuthStore } from '../../store/auth'
import { cn } from '../../utils/cn'

export default function Login() {

  const {login} = useAuthStore()
  const [isLoading,setIsLoading] = useState(false)
  

  const navigate = useNavigate()
 
  const socialItems = [
    { icon: facebookLoginIcon, link: '' },
    { icon: googleLoginIcon, link : `${import.meta.env.VITE_API_BASE_URL}/auth/login/google`},
    { icon: fingerprintLoginIcon, link: '' },
  ]

  const loginSchema = Yup.object().shape({
    emailOrPhone : Yup.string().email().required("Please enter your Email"),
    password : Yup.string().required("Please enter your password")
  })

  const handleSubmit = async (values, formikHelpers) => {
  const { resetForm } = formikHelpers;
  try {
    setIsLoading(true);
    const response = await axiosInstance.post('/api/v1/auth/login', values);
    if (response?.data?.statusCode === 200) {
      resetForm();
      const user = response.data?.data;
      const token = "dummyToken";
      login({ user, token });
      navigate("/dashboard");
    } else {
      console.error('Login failed:', response.data);
    }
    
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
  }
};

  const formik  = useFormik({
    onSubmit:(value,formikHelpers) => handleSubmit(value,formikHelpers),
    validationSchema:loginSchema,
    initialValues:{
      emailOrPhone : "",
      password : ""
    }
  })


  const handleForgetPassword = () => {
    navigate("/auth/forget-password")
  }

  return (
    <div className='relative z-10 min-h-screen flex py-5  justify-between items-center'>
      <div className='plus-bg-banner'></div>
      <Container className='flex flex-wrap flex-container justify-between'>
        <div className='flex left-img-container justify-between items-center'>
          <img src={loginSideImg} alt='img' />
        </div>

        <FormikProvider value={formik} >
          <form onSubmit={formik.handleSubmit} className='bg-mint py-24 md:px-24 px-5 sm:px-10 outline-40 outline-white rounded-xl'>
          <CommonBackBtn  label='Log In' />
              <div className='mt-4 flex flex-col gap-1'>
                <div className='text-navy font-semibold text-2xl font-league capitalize'>
                  Welcome to medicuro
                </div>
                <div className='text-xs'>
                  Please log in to access your virtual healthcare services.
                </div>
              </div>

              <div className='mt-10 flex flex-col gap-3'>
                  <Field
                    type='email'
                    name='emailOrPhone'
                    label="Email or Mobile Number"
                    placeholder='Email or Mobile Number'
                    component={CustomInput}
                    // focusHandler={errorRemovehandler}
                    className='forn-field'
                  />

                  <Field
                      type='password'
                      password
                      name='password'
                      placeholder='*******'
                      label="Password"
                      component={CustomInput}
                      // focusHandler={errorRemovehandler}
                      className='forn-field'
                  />
                {/* <CustomInput
                  name="email"
                  type='text'
                  label='Email or Mobile Number'
                  placeholder='Email or Mobile Number'
                />
                <CustomInput
                  password
                  name="password"
                  type='password'
                  label='Password'
                  placeholder='*******'
                /> */}
              </div>

              <div className='text-end text-navy font-bold text-xs cursor-pointer' onClick={handleForgetPassword}>
                Forget Password
              </div>

              <div className='flex flex-col items-center gap-4 mt-7'>
                <button  type='submit' className={cn('common-btn',isLoading ? "spinner" : "")} disabled={isLoading}>Log In</button>
                <div>or log in with</div>

                <div className='flex gap-2'>
                  {socialItems.map((item, index) => (
                    <a
                      className='bg-teal h-40 w-40 rounded-circle flex items-center justify-center'
                      key={index}
                      href={item.link}
                    >
                      <img src={item.icon} alt='' />
                    </a>
                  ))}
                </div>

                <div className='text-md'>
                  Don’t have an account?{' '}
                  <NavLink to='/signup'>
                    <span className='text-navy font-bold cursor-pointer'>
                      {' '}
                      Sign Up{' '}
                    </span>
                  </NavLink>
                </div>
              </div>
          </form>

        </FormikProvider>
      </Container>
    </div>
  )
}
