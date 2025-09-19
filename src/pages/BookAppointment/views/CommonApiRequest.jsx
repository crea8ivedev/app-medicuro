// hooks/useSubmitAppointmentRequest.jsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import axiosInstance from "../../../utils/axios";
import { showToast } from "../../../utils/toast";

export const useSubmitAppointmentRequest = () => {
  const { user } = useAuthStore(); // Hook is called correctly inside this custom hook
  const navigate = useNavigate()

  const submitAppointmentRequest = async ({serviceId, formData}) => {
    try {
      const payload = {
        userId: user?.id,
        serviceId,
        formData,
      };

      const response = await axiosInstance.post("/api/v1/appointments/request", payload);

      if(response?.data.statusCode == 200){
        showToast.success("Your appointment request was successfully submitted.")
        // navigate("/book-appointment")
        window.location.reload()
        
      }

      return true
    } catch (error) {
        showToast.error("Something went wrong")

      return false
    }
  };

  return { submitAppointmentRequest };
};
