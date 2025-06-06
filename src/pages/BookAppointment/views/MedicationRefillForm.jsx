import CustomInput from "../../../components/CustomInput"
import cameraLogo from "../../../assets/images/camera.png"
import photoPlusLogo from "../../../assets/images/plus-photos.png"
import { cn } from "../../../utils/cn"

import { useFormik , Field , FormikProvider } from "formik"
import * as Yup from "yup"
import { useRef ,useState} from "react"
import axiosInstance from "../../../utils/axios"
import { useAuthStore } from "../../../store/auth"
import { showToast } from "../../../utils/toast"
const MedicationRefillForm = ({serviceId}) => {

    const photosRef = useRef(null)
    const [isLoading,setIsLoading] = useState(false)

    const { user } = useAuthStore(); // Hook is called correctly inside this custom hook

    const validationSchema = Yup.object().shape({
        pharmacy : Yup.string().required(),
        type : Yup.string().required(),
        reason:Yup.string().required()
    })

    const submitHandler = async (values,helpers) => {
        values["photos"] = values["photos"]?.map((e) => (e?.file))

        const formData = new FormData();

      

        formData.append("formData", JSON.stringify(values) );
        values["photos"]?.forEach(file => {
             formData.append("photos", file); // use the same key "photos" for each
        });

        const data = {
            "serviceId": serviceId,
            "userId":  user?.id,
            "formData" : formData
        }
         formData.append("serviceId", serviceId);
         formData.append("userId", user?.id);
         
        try {
            setIsLoading(true)
           const response =  await axiosInstance.post("/api/v1/appointments/request", formData);
           if(response.data?.statusCode == 200){
            showToast.success("Appointment request added successfully")
           }
            // await submitAppointmentRequest(formData)
        } finally {
            setIsLoading(false)
            helpers.resetForm()
        }
    }
    const formik = useFormik({
        initialValues:{
            pharmacy : "",
            type:"",
            reason:"",
            photos : []
        },
        validationSchema,
        onSubmit:(values,helpers) => submitHandler(values,helpers)

    })


    const handlePhotoClick = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader();

        fileReader.onload = () => {
            formik.setFieldValue("photos", [...formik.values.photos,{file,preview:fileReader.result}])
        }

        fileReader.readAsDataURL(file)

        // formik.setValues("photos",[...formik.values.photos])
    }

    const discardPhotos = (index,e) => {
        e.stopPropagation()
        const photos = formik.values.photos?.filter((_,i) => i != index )
        formik.setFieldValue("photos",photos)
    }
 



    return  <div>
        <FormikProvider value={formik}>
            <div className='flex flex-col gap-7'>
                <div>
                    <div className='text-white text-xl'>Pharmacy</div>
                    <Field
                        name='pharmacy'
                        inputclasses="bg-white"
                        placeholder=''
                        component={CustomInput}
                        className='forn-field'
                    />
                </div>

                <div className='flex flex-col gap-3'>
                <div>
                        <div className='text-white text-xl'>Types of Medications & Dosage</div>
                        <div className='text-sm text-white'>Enter medication name and dosage in fields below, or take a picture with your phone.</div>
                </div>

                    <div>
                        <Field
                            name='type'
                            inputclasses="bg-white"
                            placeholder='e.g Metformin – 500mg twice daily for type 2 diabetes'
                            component={CustomInput}
                            className='forn-field'
                        />
                        <div className='mt-4'>
                            <div className='flex gap-3'>
                            <img src={cameraLogo} alt="" />
                            <div className='text-white'>Photos</div>
                            </div>
                            <div className='flex gap-2 mt-3 cursor-pointer' onClick={() => photosRef?.current?.click()}>
                                {[1,2,3].map((e,index) => {
                                    return <div key={index} className="relative"> 
                                        <img className="h-30 w-30 object-cover" key={e} src={
                                        formik.values.photos[index] ? formik.values.photos[index].preview : photoPlusLogo
                                    } alt="" />
                                    {
                                        formik.values.photos[index] && <div onClick={(e) => discardPhotos(index,e)} className="absolute top-0 right-[-5px] cursor-pointer h-20 w-20 bg-teal-400 flex items-center justify-center rounded-circle">&times; </div>
                                    }
                                    </div>
                                })
                                }
                            </div>
                            <input type="file" hidden onChange={handlePhotoClick} ref={photosRef}  />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className='text-white font-semibold'>Reason for Appointment</div>
                        <Field
                            type='textarea' 
                            cols="10" 
                            rows="10" 
                            name="reason"
                            component={CustomInput}
                            inputclasses='w-full'
                        />
                    </div>
                    <div className='md:text-end text-center mt-5'>
                    <button disabled={isLoading} onClick={formik.handleSubmit} className={cn("common-btn",isLoading ? "spinner" : "")}>Send Request</button>
                </div>
                </div>
            </div>
        </FormikProvider>
    </div>
    
}

export default MedicationRefillForm
