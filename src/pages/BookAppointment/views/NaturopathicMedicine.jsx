import CustomInput from "../../../components/CustomInput"
import CommonSelectBox from "./CommonSelectBox"
import { useFormik,Field,FormikProvider } from "formik"
import * as Yup from "yup"
import { useSubmitAppointmentRequest } from "./CommonApiRequest"
import { useState } from "react"
import { cn } from "../../../utils/cn"

const NaturopathicMedicineForm = () => {

    const { submitAppointmentRequest} = useSubmitAppointmentRequest()
    const [isLoading,setIsLoading] = useState(false)

      const validationSchema = Yup.object().shape({
            type : Yup.string().required(),
            paid : Yup.string().required(),
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
                type : "",
                reason : "",
                paid : ""
            },
            validationSchema,
            onSubmit : (values,helpers) => SubmitHandler(values,helpers)
        })

    return <div>
        <FormikProvider value={formik}>
            <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <div className='text-white'>Please select a Naturopathic appointment type</div>
                <CommonSelectBox className={"without-arrrow"} />
            </div>

              <div className='flex flex-col gap-2'>
                <div className='text-white'>This service is not covered by MCP. How will this service be paid for?</div>
                <CommonSelectBox className={"without-arrrow"} />
            </div>

            <div className='flex flex-col gap-2'>
                <div className='text-white'>Reason for Appointment</div>
                 <Field 
                        name='reason'
                        component={CustomInput}
                        type='textarea' 
                        inputclasses="w-full" 
                        rows="7" 
                    />
            </div>

            <div className='md:text-end text-center mt-5'>
                <button type="submit" disabled={isLoading} onClick={formik.handleSubmit} className={cn("common-btn",isLoading ? "spinner" : "")}>Send Request</button>
            </div>
    </div>
        </FormikProvider>
    </div>
    
}

export default NaturopathicMedicineForm