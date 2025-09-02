import { useState } from 'react'
import Container from '../../components/Container'
import signupSideImg from '../../assets/images/signup-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'
import { FormikProvider, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import Terms from '../Terms'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import axiosInstance from '../../utils/axios'
import { cn } from '../../utils/cn'

export default function Signup() {
  const [step, setStep] = useState(1)
  const [signUpFormValues, setSignUpFormValues] = useState({
    fullName: '',
    password: '',
    email: '',
    phone: '',
    dob: '',
    mcp: '',
    mcpValidationDate: '',
    mcpExpiryDate: '',
  })

  const navigate = useNavigate()



  return (
    <div className='min-h-screen py-20 flex flex-col relative items-center z-100'>
      <div className='plus-bg-banner -z-10'></div>
      <Container className='flex flex-container justify-between flex-wrap'>
        <div className='flex left-img-container justify-between items-center'>
          <img className='left-img' src={signupSideImg} alt='img' />
        </div>

        <div className='bg-mint md:mt-24 md:pt-24 mx-4  px-5    sm:px-10  md:py-7 py-10 w-500 rounded-xl  outline-40 outline-white'>
          {step === 1 && (
            <CommonBackBtn
              label='Home'
              className='font-semibold'
              onClick={() => navigate("/")}
            />
          )}

          <div className='mt-4 mb-7 px-3 md:px-[50px]'>
            {step === 0 && (
              <ProfileForm
                signUpFormValues={signUpFormValues}
                setSignUpFormValues={setSignUpFormValues}
                setStep={setStep}
              />
            )}
            {step === 1 && (
              <Terms
                signUpFormValues={signUpFormValues}
                withButton={true}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

const ProfileForm = ({ setStep, signUpFormValues, setSignUpFormValues }) => {
    const [isLoading, setIsLoading] = useState(false)
  
    const { login, user } = useAuthStore()
  
    const navigate = useNavigate()
    const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z\s]+$/, 'Full name must contain only letters'),

  password: Yup.string().required('Password is required'),
  // .min(6, 'Password must be at least 6 characters'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: Yup.string()
    .required('Mobile number is required')
    .matches(
      /^1\s\d{3}\s\d{3}\s\d{4}$/,
      'Enter a valid phone number'
    ),

  dob: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),

  mcp: Yup.string()
    .required('MCP number is required')
    .matches(/^\d{12}$/, 'Enter 12 numbers without spaces'),

  mcpValidationDate: Yup.date().required('MCP validation date is required'),

  mcpExpiryDate: Yup.date()
    .required('MCP expiry date is required')
    .min(
      Yup.ref('mcpValidationDate'),
      'Expiry date must be after validation date'
    ),
});


    const submitSignUpForm = async (values, helpers) => {
  
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
          ...values,
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

  const submitHandler = (values) => {
    setSignUpFormValues(values)
    setStep(1)
    window.location.hash = 'terms'
  }

  const formik = useFormik({
    initialValues: signUpFormValues,
    onSubmit: (values, helpers) => submitSignUpForm(values, helpers),
    validationSchema: signUpSchema,
  })

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
        <Field
          type='text'
          name='fullName'
          label='Full Name'
          placeholder='first and last name'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='password'
          name='password'
          password
          label='Password'
          placeholder='••••••••••••••••'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='email'
          name='email'
          label='Email'
          placeholder='example@example.com'
          component={CustomInput}
          className='forn-field'
        />

        <Field
          type='number'
          name='phone'
          label='Mobile Number'
          placeholder='1709 xxx xxxx'
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

        <div className='mt-3'>
          <Field
            type='number'
            name='mcp'
            label='MCP'
            placeholder='000 000 000 000'
            component={CustomInput}
            className='forn-field'
          />
        </div>

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
            className={cn('common-btn my-4 cursor-pointer w-full md:w-auto',isLoading ? "opacity-5 cursor-not-allowed" : "")}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </FormikProvider>
  )
}
