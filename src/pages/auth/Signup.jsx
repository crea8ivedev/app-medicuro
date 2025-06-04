import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import signupSideImg from '../../assets/images/signup-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'
import { FormikProvider, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../utils/axios'
import { useAuthStore } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { getFirebaseToken } from '../../utils/firebaseConfig'

export default function Signup() {

  const [step, setStep] = useState(0)
  const [signUpFormValues, setSignUpFormValues] = useState({
    fullName: '',
    password: '',
    email: '',
    phone: '',
    dob: '',
    mcp: '',
    mcpValidationDate: '',
    mcpExpiryDate: ''
  })

  return (
    <div className='min-h-screen py-20 flex flex-col relative items-center z-100'>
      <div className='plus-bg-banner'></div>
      <Container className='flex flex-container justify-between flex-wrap'>
        <div className='flex left-img-container justify-between items-center'>
          <img className='left-img' src={signupSideImg} alt='img' />
        </div>

        <div
          className='bg-mint md:mt-24 md:pt-24   md:px-24 px-10 sm:px-10  md:py-7 py-10 w-500 rounded-xl  outline-40 outline-white'
        >
          {
            step === 1 && <CommonBackBtn onClick={() => setStep(0)} label='Sign Up' />
          }

          <div className='mt-4 mb-7'>
            {step === 0 && <ProfileForm signUpFormValues={signUpFormValues} setSignUpFormValues={setSignUpFormValues} setStep={setStep} />}
            {step === 1 && <Terms signUpFormValues={signUpFormValues} setStep={setStep} />}
          </div>
        </div>

      </Container>
    </div>
  )
}

const Terms = ({ setStep, signUpFormValues }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { login, user } = useAuthStore()

  const navigate = useNavigate()

  const submitSignUpForm = async () => {
    // const userData = {
    //   fullName: "Jane Doe",
    //   email: "newemails4ss2@gmail.com",
    //   password: "123456",
    //   dob: "1995-06-15T00:00:00.000Z",
    //   mcp: "1995-06-15T00:00:00.000Z",
    //   mcpValidationDate: "1995-06-15T00:00:00.000Z",
    //   mcpExpiryDate: "1995-06-16T00:00:00.000Z",
    //   phone: "9904982210532"
    // };


    try {
      setIsLoading(true);
      let notificationToken;

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        notificationToken = await getFirebaseToken()
      }

      const response = await axiosInstance.post('/api/v1/auth/register', {
        ...signUpFormValues,
        ...(notificationToken && { notificationToken }),
      })
      if (response?.data?.statusCode == 201) {
        const user = response.data?.data
        const token = "dummyToken"
        login({ user, token })
        navigate("/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div>
      <div className='mb-5 text-center'>
        <div>By continuing, you agree to </div>
        {user?.fullName}
        <div>
          <span className='text-bluewave font-bold'>Terms of Use </span> and{' '}
          <span className='text-bluewave font-bold'>Privacy Policy.</span>
        </div>
      </div>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac
        diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a
        scelerisque neque, sed accumsan metus. Nunc auctor tortor in dolor
        luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at
        rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper
        ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex
        placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas
        nulla posuere neque tincidunt porta.
      </div>
      <div className='text-navy font-bold my-3 text-xl'>
        terms & conditions
      </div>
      <ul>
        <li className='list-decimal'>
          Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada
          eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex
          nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis
          rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget
          rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus
          ac turpis.
        </li>
      </ul>

      <div className='text-center'>
        <button
          disabled={isLoading}
          className={cn("common-btn my-4 cursor-pointer", isLoading ? "spinner" : "")}
          onClick={() => submitSignUpForm()}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

const ProfileForm = ({ setStep, signUpFormValues, setSignUpFormValues }) => {


  const signUpSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters'),

    password: Yup.string()
      .required('Password is required'),
    // .min(6, 'Password must be at least 6 characters'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    phone: Yup.string()
      .required('Mobile number is required'),
    // .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),

    dob: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),

    mcp: Yup.string()
      .required('MCP number is required')
    // .matches(/^[0-9\s]{12}$/, 'MCP should be 12 digits'),
    ,
    mcpValidationDate: Yup.date()
      .required('MCP validation date is required'),

    mcpExpiryDate: Yup.date()
      .required('MCP expiry date is required')
      .min(
        Yup.ref('mcpValidationDate'),
        'Expiry date must be after validation date'
      )
  })

  const submitHandler = (values) => {
    setSignUpFormValues(values)
    setStep(1)
  }

  const formik = useFormik({
    initialValues: signUpFormValues,
    onSubmit: (values, helpers) => submitHandler(values, helpers),
    validationSchema: signUpSchema
  })

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
        <Field
          type='text'
          name='fullName'
          label='Full Name'
          placeholder='First and last name'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='password'
          name='password'
          password
          label='Password'
          placeholder='Password'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='email'
          name='email'
          label='Email'
          placeholder='Email'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='text'
          name='phone'
          label='Mobile Number'
          placeholder='Mobile Number'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='date'
          name='dob'
          label='Date of Birth'
          placeholder='dd / mm / yyyy'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='date'
          name='mcp'
          label='MCP'
          placeholder='000 000 000 000'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='date'
          name='mcpValidationDate'
          label='MCP Validation Date'
          placeholder='dd / mm / yyyy'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='date'
          name='mcpExpiryDate'
          label='MCP Expiry Date'
          placeholder='dd / mm / yyyy'
          component={CustomInput}
          className='forn-field'
        />

        <div className='text-center'>
          <button
            type='submit'
            className='common-btn my-4 cursor-pointer'
          >
            Next
          </button>
        </div>
      </form>
    </FormikProvider>
  )
}
