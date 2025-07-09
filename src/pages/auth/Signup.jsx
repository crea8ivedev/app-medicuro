import { useState } from 'react'
import Container from '../../components/Container'
import signupSideImg from '../../assets/images/signup-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'
import { FormikProvider, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import Terms from '../Terms'

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
    mcpExpiryDate: '',
  })

  return (
    <div className='min-h-screen py-20 flex flex-col relative items-center z-100'>
      <div className='plus-bg-banner -z-10'></div>
      <Container className='flex flex-container justify-between flex-wrap'>
        <div className='flex left-img-container justify-between items-center'>
          <img className='left-img' src={signupSideImg} alt='img' />
        </div>

        <div className='bg-mint md:mt-24 md:pt-24 mx-4  px-5    sm:px-10  md:py-7 py-10 w-500 rounded-xl  outline-40 outline-white'>
          {step === 1 && (
            <CommonBackBtn onClick={() => setStep(0)} label='Sign Up' className='font-semibold' />
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
  const signUpSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters'),

    password: Yup.string().required('Password is required'),
    // .min(6, 'Password must be at least 6 characters'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    phone: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]+$/, 'Mobile number must contain only digits'),
    // .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),

    dob: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),

    mcp: Yup.string().required('MCP number is required'),
    // .matches(/^[0-9\s]{12}$/, 'MCP should be 12 digits'),
    mcpValidationDate: Yup.date().required('MCP validation date is required'),

    mcpExpiryDate: Yup.date()
      .required('MCP expiry date is required')
      .min(
        Yup.ref('mcpValidationDate'),
        'Expiry date must be after validation date',
      ),
  })

  const submitHandler = (values) => {
    setSignUpFormValues(values)
    setStep(1)
  }

  const formik = useFormik({
    initialValues: signUpFormValues,
    onSubmit: (values, helpers) => submitHandler(values, helpers),
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
            className='common-btn my-4 cursor-pointer w-full md:w-auto'
          >
            Next
          </button>
        </div>
      </form>
    </FormikProvider>
  )
}
