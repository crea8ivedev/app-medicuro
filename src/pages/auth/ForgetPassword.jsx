import Container from '../../components/Container'
import loginSideImg from '../../assets/images/login-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'

import { useNavigate } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup"
import axiosInstance from '../../utils/axios'
import { showToast } from '../../utils/toast'
import { useState } from 'react'

export default function ForgetPassword() {

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const loginSchema = Yup.object().shape({
    email : Yup.string().email().required("Please enter your Email"),
  })

  const handleSubmit = async  (values, formikHelpers) => {
    const { resetForm } = formikHelpers

    try {
      setLoading(true)
      const response =  await axiosInstance.post('/api/v1/auth/forgot-password', values)
      if(response?.data?.statusCode == 200){
        resetForm()
        showToast.success("Password reset link has been sent to your email")
        navigate("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  const formik  = useFormik({
    onSubmit:(value,formikHelpers) => handleSubmit(value,formikHelpers),
    validationSchema:loginSchema,
    initialValues:{
      email : "",
    }
  })

  return (
    <div className='relative z-10 min-h-screen flex py-5  justify-between items-center'>
      <div className='plus-bg-banner'></div>
      <Container className='flex flex-wrap flex-container justify-between'>
        <div className='flex left-img-container justify-between items-center'>
          <img src={loginSideImg} alt='img' />
        </div>

        <FormikProvider value={formik} >
          <form onSubmit={formik.handleSubmit} className='bg-mint py-10   mx-4  outline-40 outline-white rounded-xl max-w-md'>
          
          <div className='sm:px-10 px-3 md:mb-22 mb-10'>
              <CommonBackBtn  label='Forget Password' /> 
          </div>
              <div className='md:px-24 px-5 w-full'>
                  <div className='mt-4 flex flex-col gap-1'>
                    <div className='text-navy font-semibold text-2xl font-league capitalize'>
                      Welcome to medicuro
                    </div>

                    <div className='text-xs'>
                      Enter your registered email address below, and we'll send you a link to reset your password.
                    </div>
                  </div>

                  <div className='mt-10 flex flex-col gap-3'>
                      <Field
                        type='email'
                        name='email'
                        label="Email"
                        placeholder='Email'
                        component={CustomInput}
                        className='forn-field'
                      />
                  </div>
                  <div className='text-center my-10'>
                        <button disabled={loading} onClick={formik.handleSubmit}  type='submit' className='common-btn'>Send Link</button>
                  </div>
              </div>
          </form>


        </FormikProvider>
      </Container>
    </div>
  )
}
