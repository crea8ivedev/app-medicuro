import CustomInput from "../../../components/CustomInput"
import { useFormik,Field,FormikProvider } from "formik"
import * as Yup from "yup"
import { useSubmitAppointmentRequest } from "./CommonApiRequest"
import { useState } from "react"
import { cn } from "../../../utils/cn"



const CompanyPartnerAppointmentForm = ({serviceId}) => {


    const { submitAppointmentRequest} = useSubmitAppointmentRequest()
    const [isLoading,setIsLoading] = useState(false)


    const validationSchema = Yup.object().shape({
        companyName : Yup.string().required("Company name is required"),
        reason : Yup.string().required("Reason is required")
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
            companyName : "",
            reason : ""
        },
        validationSchema,
        onSubmit : (values,helpers) => SubmitHandler(values,helpers)
    })

    return  <div>
        <FormikProvider value={formik}>
            <div className='flex flex-col gap-4 pb-10'> 
                <div>
                    <div className='text-white font-semibold'>My Company Name</div>
                     <Field 
                        name='companyName'
                        component={CustomInput}
                        className='forn-field'
                        errorStyle="text-white"
                    />
                    {/* <CustomInput /> */}
                </div>

                <div>
                    <div className='text-white font-semibold'>Reason for Appointment</div>
                    <Field 
                        name='reason'
                        component={CustomInput}
                        className='forn-field'
                        type='textarea' 
                        inputclasses="w-full outline-0" 
                        rows={10}
                        errorStyle="text-white"
                    />
                    {/* <CustomInput type='textarea' inputclasses="w-full outline-0" rows={10} /> */}
                </div>

                <div className='md:text-end text-center mt-5'>
                    <button type="submit" disabled={isLoading} onClick={formik.handleSubmit} className={cn("common-btn",isLoading ? "spinner" : "")}>Send Request</button>
                </div>
            </div>
        </FormikProvider>
    </div>
    
}

export default CompanyPartnerAppointmentForm