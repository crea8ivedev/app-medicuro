import Container from '../../components/Container'
import signupSideImg from '../../assets/images/signup-vector.png'
import CommonBackBtn from '../../components/CommonBackBtn'
import CustomInput from '../../components/CustomInput'
import { useFormik,FormikProvider,Field } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showToast } from '../../utils/toast';
import { cn } from '../../utils/cn';


export default function SetPassword() {

  const [params] = useSearchParams()
  const [signature,setSignature] = useState()
  const [isLoading,setIsLoading] = useState(false)

  const  navigate = useNavigate();

  useEffect(() => {
      if(params.has("signature")){
        setSignature(params.get("signature"))
      }
  })

  const passwordSchema = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   'Must contain uppercase, lowercase, number and special character'
    // )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });


  const submitResetPasswordForm = async (values) => {
    try {
      setIsLoading(true)
      values.signature = signature;
      const response =  await axiosInstance.post('/api/v1/auth/reset-password', values)
      if(response?.data?.statusCode == 200){
        showToast.success("Password changed successfully")
        navigate("/dashboard",{ replace : true })
      }
    } finally{
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => submitResetPasswordForm(values)
  });



  return (
    <div className='min-h-screen  flex flex-col relative items-center z-100'>
      <div className='plus-bg-banner'></div>
      <Container className='flex min-h-screen items-center flex-wrap flex-container justify-between'>
        <div className='flex justify-between items-center left-img-container'>
          <img className='left-img' src={signupSideImg} alt='img' />
        </div>

        <form
          action=''
          className='bg-mint  pt-17 pb-24 max-h-max px-7   md:px-24 w-500 rounded-md outline-40 outline-white'
        >
          <CommonBackBtn link='' label='Set Password' />
          <div className='mt-20 ps-3 mb-7 flex flex-col gap-4'>
            <div className='text-sm font-semibold'>
              Create a secure password to protect your account. Your password
              should be at least 8 characters long and include a combination of
              letters, numbers, and symbols.
            </div>


            <FormikProvider value={formik}>
              <div className='flex flex-col gap-3'>
                <Field 
                  name="password"
                  password
                  type='password'
                  label='Password'
                  placeholder='********'
                 component={CustomInput}
                 className="forn-field"
                />

                <Field 
                  name="confirmPassword"
                  password
                  type='password'
                  label='confirmPassword'
                  placeholder='********'
                 className="forn-field"
                 component={CustomInput}
                />
              </div>

            </FormikProvider>

            <div className='text-center mt-7 mb-20'>
              <button onClick={formik.handleSubmit} className="common-btn" disabled={isLoading}>Create New Password</button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}
