import { useEffect, useState } from "react"
import axiosInstance from "../../../utils/axios"
import { showToast } from "../../../utils/toast"
import PhysicalAppointmentForm from "./PhysicalAppointmentForm"
import MedicationRefillForm from "./MedicationRefillForm"
import CompanyPartnerAppointmentForm from "./CompanyPartnerAppointment"
import NaturopathicMedicineForm from "./NaturopathicMedicine"
import spinner from "../../../assets/images/spinner.gif"


import { useFormik,Field,FormikProvider } from "formik"
import CustomInput from "../../../components/CustomInput"
import CommonSelectBox from "./CommonSelectBox"
import * as Yup from "yup"
import { cn } from "../../../utils/cn"
import { useAuthStore } from "../../../store/auth"
import PhotosUploader from "./PhotosUploader"


function DynamicForm({item,serviceId,id}) {
    const [isLoading,setIsLoading] = useState(false)
    const { user } = useAuthStore(); // Hook is called correctly inside this custom hook

    const fields = item?.form?.fields

    useEffect(() => {
      console.log("filedsssssssssssssss",item)
    },[item])
 
    const initialValues = fields?.reduce((acc, field) => {
        acc[field.name] = field.type === "file" ? [] : "";
        return acc;
      }, {}); 

  // ✅ Generate Yup schema dynamically
     const validationSchema = Yup.object().shape(
        fields?.reduce((acc, field) => {
          if (field.type !== "file") {
            acc[field.name] = Yup.string().required(`${field.label} is required`);
          }
          return acc;
        }, {})
      );


  const SubmitHandler = async (values, helpers) => {
        const formData = new FormData();

        fields?.forEach((field) => {
            if (field.type === "file") {
              const files = values[field.name] || [];
              
              files.forEach((fileObj) => {
                if (fileObj?.file) {
                  formData.append(field.name, fileObj.file); // Use dynamic field name!
                }
              });
            }
          }) 
     
        formData.append("formData", JSON.stringify(values));
        formData.append("serviceId", serviceId);
        formData.append("userId", user?.id);

        try {
          setIsLoading(true);

          const response = await axiosInstance.post("/api/v1/appointments/request", formData);

          if (response.data?.statusCode === 200) {
            showToast.success("Appointment request added successfully");
          }
        } catch (error) {
          showToast.error("Something went wrong");
        } finally {
          setIsLoading(false);
          helpers.resetForm();
  }
};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: SubmitHandler
  });

  return (
    <div>
        {
          isLoading ? <img  src={spinner} className="w-10"  alt="loading"/> : 
         <FormikProvider value={formik}>
                  <div className='pb-10 space-y-5'>
                    {fields?.map((field) => (
                      <div key={field.name}>
                        {
                          field.type === "file" 
                          ? 
                          <PhotosUploader name={field.name}/>
                          :
                            <Field
                              name={field?.name ?? ""}
                              component={field.type === 'select' ? CommonSelectBox : CustomInput}
                              options={field?.options}
                              inputclasses='w-full'
                              rows={field.type === 'textarea' ? 6 : undefined}
                              errorStyle='text-white'
                              className="forn-field"
                              type={field.type}
                              label={field.label}
                              labelclasses="text-white font-bold mb-2"
                            />

                        }
                      </div>
                    ))}

                    <div className='md:text-end text-center mt-5'>
                      <button
                        disabled={isLoading}
                        onClick={formik.handleSubmit}
                        className={cn('common-btn')}
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                </FormikProvider>
          
        }
    </div>
  )
}

export default DynamicForm

const BookAppointmentForm = ({name,serviceId,id}) => {
    const allItems = {
        "physical" : PhysicalAppointmentForm,
        "medical" : MedicationRefillForm,
        "comnpanyPartner" : CompanyPartnerAppointmentForm,
        "naturopathy" : NaturopathicMedicineForm
    }
    const SelectedComponent = allItems[name];
    return SelectedComponent ? <SelectedComponent serviceId={id} id={id}/> : ""
}