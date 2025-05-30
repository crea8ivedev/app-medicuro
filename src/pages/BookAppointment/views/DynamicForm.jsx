import { useEffect, useState } from "react"
import axiosInstance from "../../../utils/axios"
import { showToast } from "../../../utils/toast"
import PhysicalAppointmentForm from "./PhysicalAppointmentForm"
import MedicationRefillForm from "./MedicationRefillForm"
import CompanyPartnerAppointmentForm from "./CompanyPartnerAppointment"
import NaturopathicMedicineForm from "./NaturopathicMedicine"
import spinner from "../../../assets/images/spinner.gif"

function DynamicForm({serviceId,id}) {
    const [serviceTypes,setServiceTypes] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        const fetchFields = async  () => {
         try {
              setIsLoading(true)
              const response = await  axiosInstance.get(`/api/v1/services/type`)
              setServiceTypes(response.data?.data)
          
         } catch (error) {
            showToast.error("Somethig went wrong")
         } finally {
          setIsLoading(false)
         }
        }
        fetchFields()
    },[serviceId])

  return (
    <div>
        {
           isLoading ?  <img  src={spinner} className="w-10"  alt="loading"/> : 
            serviceTypes?.find(e => e.id == serviceId)?.name ? 
            <BookAppointmentForm id={id} serviceId={serviceId}  name={serviceTypes?.find(e => e.id == serviceId)?.name} />
          : ""
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