import { useFormik, FormikProvider, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import CommonBackBtn from '../components/CommonBackBtn'
import CustomInput from '../components/CustomInput'
import axiosInstance from '../utils/axios'
import { showToast } from '../utils/toast'
import { useNavigate } from 'react-router-dom'

function PasswordReset() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const passwordFields = [
    {
      type: 'password',
      placeholder: '**********',
      label: 'Current Password',
      name: 'currentPassword'
    },
    {
      type: 'password',
      placeholder: '**********',
      label: 'New Password',
      name: 'newPassword'
    },
    {
      type: 'password',
      placeholder: '**********',
      label: 'Confirm Password',
      name: 'confirmPassword'
    }
  ]

  const passwordChangeValidationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().required('New password is required'),
    confirmPassword: Yup.string()
      .required('Please confirm your new password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  })

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: passwordChangeValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)

      try {
        const response = await axiosInstance.post('/api/v1/auth/password/update', {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword
        })

        if (response.data?.statusCode === 200) {
          showToast.success(response.data.message)
          formik.resetForm()
          navigate("/")
          
        }
      } catch (error) {
      }

      setIsLoading(false)
    }
  })

  return (
    <div className='bg-sky-foam h-screen pb-16 relative'>
      <div className='common-bg absolute left-0 right-0'></div>

      <div className='flex flex-col p-5'>
        <CommonBackBtn label='Password Reset' />
      </div>

      <div className='flex w-full justify-center items-center md:mt-24'>
        <div className='bg-mint relative w-825 md:p-10 p-5 pb-20 flex flex-col gap-7 items-center'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>

          <div className='mt-10 sm:w-sm w-full'>
            <FormikProvider value={formik}>
              {
                passwordFields.map((item, index) => (
                  <div className='my-5' key={index}>
                    <Field
                      name={item.name}
                      label={item.label}
                      type={item.type}
                      placeholder={item.placeholder}
                      component={CustomInput}
                      className='forn-field'
                      password
                    />
                  </div>
                ))
              }
            </FormikProvider>
          </div>

          <div>
            <button
              onClick={formik.handleSubmit}
              className='btn-loader common-btn relative z-1'
              disabled={isLoading}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
