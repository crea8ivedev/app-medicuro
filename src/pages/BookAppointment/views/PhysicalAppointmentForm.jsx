import { useFormik,Field,FormikProvider } from "formik"
import * as Yup from "yup"
import CustomInput from "../../../components/CustomInput"
import { useAuthStore } from "../../../store/auth"
import { useSubmitAppointmentRequest } from "./CommonApiRequest"
import { useState } from "react"
import { cn } from "../../../utils/cn"

const PhysicalAppointmentForm = ({serviceId}) => {
    const {user} = useAuthStore()

    const { submitAppointmentRequest} = useSubmitAppointmentRequest()
    const [isLoading,setIsLoading] = useState(false)
    
    const validationSchema = Yup.object().shape({
        reason : Yup.string().required()
    })

    const SubmitHandler = async  (values,helpers) => {
        try{
            setIsLoading(true)
            await submitAppointmentRequest ({serviceId, formData:values })
        }finally{
            setIsLoading(false)
            helpers.resetForm()
        }
    }

    const formik = useFormik({
        initialValues : {
            reason : "",
        },
        validationSchema,
        onSubmit : (values,helpers) => SubmitHandler(values,helpers)
    })


    return <div>
        <FormikProvider value={formik}>
            <div className='pb-10'>
                <div className='text-white font-bold mb-2'>Reason for Appointment</div>
                 <Field 
                        name='reason'
                        component={CustomInput}
                        type='textarea' 
                        inputclasses="w-full" 
                        rows="10" 
                    />
                <div className='md:text-end text-center mt-5'>
                    <button disabled={isLoading} onClick={formik.handleSubmit} className={cn("common-btn",isLoading ? "spinner" : "")}>Send Request</button>
                </div>
            </div>
        </FormikProvider>
    </div>
}

export default PhysicalAppointmentForm