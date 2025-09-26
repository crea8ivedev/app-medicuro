import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import loginSideImg from '../../assets/images/login-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'

import facebookLoginIcon from '../../assets/images/facebook.svg'
import googleLoginIcon from '../../assets/images/google.svg'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../utils/axios'
import { useAuthStore } from '../../store/auth'
import { getFirebaseToken } from '../../utils/firebaseConfig'
import { showToast } from '../../utils/toast'
import { cn } from '../../utils/cn'

export default function Login() {
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [query, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (query.get('restricted')) {
      showToast.error(
        'Your account has been restricted. Please contact support.',
      )
    }
    query.delete('restricted')
    setSearchParams(query, { replace: true })
  }, [query])

  const navigate = useNavigate()

  const socialItems = [
    { icon: googleLoginIcon, link: `/auth/login/google`, alt: 'google-icon' },
    {
      icon: facebookLoginIcon,
      link: '/auth/login/facebook',
      alt: 'facebook icon',
    },
  ]

  const loginSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .required('Please enter email or mobile number')
      .test(
        'is-email-or-mobile',
        'Please enter a valid email or mobile number',
        function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const mobileRegex = /^[6-9]\d{9}$/

          if (!value) return false
          return emailRegex.test(value) || mobileRegex.test(value)
        },
      ),
    password: Yup.string().required('Please enter your password'),
  })

  const handleSubmit = async (values, formikHelpers) => {
    const { resetForm } = formikHelpers
    setIsLoading(true)

    try {
      let notificationToken

      try {
        if (Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission()
          if (permission === 'granted') {
            notificationToken = await getFirebaseToken()
          }
        } else {
          notificationToken = await getFirebaseToken()
        }
      } catch (error) {}

      const response = await axiosInstance.post('/api/v1/auth/login', {
        ...values,
        ...(notificationToken && { notificationToken }),
      })
      if (response?.data?.statusCode === 200) {
        resetForm()
        const user = response.data?.user
        await new Promise((res) => setTimeout(res, 1000))
        login({ user })
        navigate('/dashboard')
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    onSubmit: (value, formikHelpers) => handleSubmit(value, formikHelpers),
    validationSchema: loginSchema,
    initialValues: {
      emailOrPhone: '',
      password: '',
    },
  })

  const handleForgetPassword = () => {
    navigate('/auth/forget-password')
  }

  return (
    <div className='relative  min-h-[100dvh] md:min-h-screen md:max-h-auto z-10 flex py-5 justify-around items-center'>
      <div className='plus-bg-banner'></div>
      <Container className='flex flex-wrap flex-container justify-between'>
        <div className='hidden md:flex left-img-container justify-between items-center'>
          <img src={loginSideImg} alt='img' />
        </div>

        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className='bg-mint py-5 md:py-12 md:px-24 px-5 sm:px-5 outline-40 outline-white rounded-xl'
          >
            <CommonBackBtn label='Log In' />
            <div className='mt-4 flex flex-col gap-1'>
              <div className='text-navy font-semibold text-2xl font-league capitalize'>
                Welcome to medicuro
              </div>
              <div className='text-xs'>
                Please log in to access your virtual healthcare services.
              </div>
            </div>

            <div className='mt-10 flex flex-col gap-5'>
              <Field
                type='text'
                name='emailOrPhone'
                label='Email or Mobile Number'
                placeholder='example@example.com'
                component={CustomInput}
                // focusHandler={errorRemovehandler}
                className='forn-field'
              />

              <Field
                type='password'
                password
                name='password'
                placeholder='********'
                label='Password'
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

            <div
              className='text-end text-navy font-bold text-xs mt-2 cursor-pointer hover:underline'
              onClick={handleForgetPassword}
            >
              Forget Password
            </div>

            <div className='flex flex-col items-center gap-4 mt-7'>
              <button
                type='submit'
                className={cn(
                  'btn-loader relative common-btn font-extralight font-outfit w-full md:w-auto z-10 ',
                )}
                disabled={isLoading}
              >
                Log In
              </button>
              <div className='text-sm'>or log in with</div>

              <div className='flex gap-2'>
                {socialItems.map((item, index) => (
                  <a
                    className='bg-teal h-40 w-40 rounded-circle flex items-center justify-center hover:opacity-90'
                    key={index}
                    href={item.link}
                  >
                    <img src={item.icon} alt={item.alt} />
                  </a>
                ))}
              </div>

              <div className='text-sm'>
                Don’t have an account?{' '}
                <NavLink to='/signup'>
                  <span className='text-navy font-bold cursor-pointer hover:underline'>
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
