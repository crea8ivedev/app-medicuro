import CommonBackBtn from '../components/CommonBackBtn'
import dummyProfile from "../assets/images/logo.svg"
import whitePen from "../assets/images/white-pen.svg"
import { useFormik,Field,FormikProvider } from 'formik'
import CustomInput from '../components/CustomInput'
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../store/auth'
import axiosInstance from '../utils/axios'
import { showToast } from '../utils/toast'
import { cn } from '../utils/cn'

function UpdateProfile() {
const profilePicRef = useRef()
const { user , login } = useAuthStore();

const [profilePic,setProfilePic] = useState()
const [profilePicFile,setProfilePicFile] = useState(false)
const [profilePicSubmitting,setProfilePicSubmitting] = useState(false)



// const changeProfilePic = (e) => {
//     const file = e.target.files[0];
//     const fileReader = new FileReader()

//     fileReader.onload = () => {
//         const fileData = fileReader.result;
//         setProfilePic(fileData)
//         setProfilePicFile(file)
//     }

//     fileReader.readAsDataURL(file)
// }

const changeProfilePic = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader()
    fileReader.onload = () => {
        const fileData = fileReader.result;
        setProfilePic(fileData)
    }
    fileReader.readAsDataURL(file)
    uploadProfilePic(file); 
}

const uploadProfilePic = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append('profilePic', file);
  setProfilePicSubmitting(true)
  try {
    const response = await axiosInstance.post('/api/v1/auth/profile-picture/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data?.statusCode === 200) {
      showToast.success("Profile picture updated successfully");
      if (response.data?.profilePic) {
        // Optionally update user state
        login({ user: { ...user, profilePic: response.data.profilePic } });
      }
    }
  } catch (error) {
    showToast.error("Failed to update profile picture");
  } finally {
    setProfilePicSubmitting(false)
  }
};

return (
    <div className=' bg-sky-foam min-h-screen pb-16 relative'>
        <div className='common-bg absolute  '></div>

        <div className='flex flex-col p-5  '>
            <CommonBackBtn   label='My Profile'  />
        </div>

        <div className='flex  w-full justify-center items-center lg:mt-20'>
            <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 py-24'>
            <div className='common-right-design  z-10 bottom-5 right-5'></div>
                        <div className='relative max-w-max m-auto text-center'>
                                <img className='m-auto w-105 h-105 object-cover rounded-circle' src={profilePic ?? user?.profilePic ?? dummyProfile} alt="" />
                                <div onClick={() => profilePicRef?.current?.click()}  className=' bg-bluewave rounded-circle flex justify-center items-center w-30 h-30 absolute right-0 bottom-0 cursor-pointer'>
                                    <img src={whitePen} alt="" className={cn(profilePicSubmitting && "opacity-70 cursor-not-allowed")} />
                                    <input disabled={profilePicSubmitting} onChange={(e) => changeProfilePic(e)} accept='image/jpeg,image/png,image/webp,image/avif,image/jpg' ref={profilePicRef} type="file" hidden />

                                </div>
                        </div>  
                        {
                            <MyProfileInfo profilePic={profilePicFile}/>
                        }
                        
            </div>
        </div>
    </div>
  )
}

const MyProfileInfo = ({profilePic}) => {
    const { user,login } = useAuthStore();
    const [isLoading,setIsLoading] = useState()

    useEffect(() => {
        formik.setValues({
            fullName: user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            dob: user.dob ? user.dob.split('T')[0] : '', 
            mcp: user.mcp ? user.mcp.split('T')[0] : '',
            mcpValidationDate: user.mcpValidationDate ? user.mcpValidationDate.split('T')[0] : '',
            mcpExpiryDate: user.mcpExpiryDate ? user.mcpExpiryDate.split('T')[0] : '',
        });
    },[user])


    const formFields = [
        {
            label: "Full Name",
            name: "fullName",
            type: "text",
        },
        {
            label: "Phone",
            name: "phone",
            type: "number",
            placeholder : "1709 XXX XXXX"
        },
        {
            label: "Email",
            name: "email",
            type: "email",
            readOnly:true
        },
        {
            label: "Date of Birth",
            name: "dob",
            type: "date",
        },
        {
            label: "MCP",
            name: "mcp",
            type: "text",
        },
        {
            label: "MCP Validation Date",
            name: "mcpValidationDate",
            type: "date",
            placeholder: "dd / mm / yyyy"
        },
        {
            label: "MCP Expiry Date",
            name: "mcpExpiryDate",
            type: "date",
            placeholder: "dd / mm / yyyy"
        }
    ];

    const  validationSchema = Yup.object({
    fullName: Yup.string()
        .required('Full Name is required'),

    phone: Yup.string()
        // .matches(/^1\s\d{3}\s\d{3}\s\d{4}$/, 'Phone Number must be in format: 1 709 XXX XXXX')
        .required('Phone Number is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    dob: Yup.date()
        .required('Date of Birth is required'),

    mcp: Yup.string()
        // .matches(/^\d{3}\s\d{3}\s\d{3}\s\d{3}$/, 'MCP must be in format: 000 000 000 000')
        .required('MCP is required'),

    mcpValidationDate: Yup.date()
        .required('Validation Date is required'),

    mcpExpiryDate: Yup.date()
        .min(
        Yup.ref('mcpValidationDate'),
        'Expiry Date must be after Validation Date'
        )
        .required('Expiry Date is required'),
    });

    const updateProfile = async (values) => {
        setIsLoading(true)
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (profilePic) {
            formData.append('profilePic', profilePic);
        }

        try {
            const response = await axiosInstance.post("/api/v1/auth/profile/update",formData)
            
            if(response.data?.statusCode == 200){
                if(response.data?.updatedUser){
                    login({user:response.data?.updatedUser})
                }
                showToast.success(response.data?.message)
        }
        } catch (error) {
        } finally {
            setIsLoading(false)
        }

        
    }

    const formik = useFormik({
    initialValues: {
        fullName: '',
        phone: '',
        email: '',
        dob: '',
        mcp: '',
        mcpValidationDate: '',
        mcpExpiryDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => updateProfile(values),
    });


    return <div>
        <div className='m-auto sm:w-sm w-full'>
                <FormikProvider value={formik} > 
                    <form  encType="multipart/form-data">
                        {
                            
                            formFields.map((item,index) => {
                                return <div key={index}  className='my-4'>
                                    <Field
                                    name={item.name}
                                    label={item.label}
                                    placeholder={item.placeholder}
                                    component={CustomInput}
                                    className='forn-field'
                                    type={item.type}
                                    isMcp={item?.isMcp}
                                    readOnly={item?.readOnly}
                                    />
                                
                                </div>
                                
                                
                                
                            })
                        }
                    </form>
                </FormikProvider>
        </div>

        <div className='text-center mt-10'>
            <button className="common-btn" disabled={isLoading} onClick={() => formik.handleSubmit()}>Update Profile</button>        
        </div>
    </div>
    
   
}

export default UpdateProfile