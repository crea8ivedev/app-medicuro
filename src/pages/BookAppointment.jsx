import { useEffect, useState } from 'react'
import appointmentSideImage from '../assets/images/book-appointment-vector.png';
import CommonBackBtn from '../components/CommonBackBtn';
import { cn } from '../utils/cn';
import CustomInput from '../components/CustomInput';
import cameraLogo from "../assets/images/camera.png"
import photoPlusLogo from "../assets/images/plus-photos.png"
import axiosInstance from "../utils/axios"

function BookAppointment() {



const [bookingItems,setBookingItems] = useState( [
  { id: 1, name: "Physician / Nurse Practitioner Appointment", isFeesApply: false, isSelected: false,desc:"Please enter your preferred pharmacy and the types of medications you require in the fields below." },
  { id: 2, name: "Medication Refill", isFeesApply: false, isSelected: false,desc:"Please enter your preferred pharmacy and the types of medications you require in the fields below." },
  { id: 3, name: "Virtual Physiotherapy", isFeesApply: true, isSelected: false },
  { id: 4, name: "Virtual Gynaecology Follow-Up (Referral required for initial visits)", isFeesApply: false, isSelected: false },
  { id: 5, name: "Short Term Sick Notes", isFeesApply: true, isSelected: false },
  { id: 6, name: "WorkplaceNL Appointment", isFeesApply: false, isSelected: false },
  { id: 7, name: "Naturopathic Medicine", isFeesApply: true, isSelected: false,desc:"Choose the appropriate naturopathic service based on your needs. Please note this service is not covered by MCP. Indicate your preferred payment method below." },
  { id: 8, name: "Virtual Ergonomic Assessment", isFeesApply: false, isSelected: false },
  { id: 9, name: "Disability Tax Credit Form / CPP", isFeesApply: true, isSelected: false },
  { id: 10, name: "Personal Care Home Services (Med Review / Pre-Entrance Forms)", isFeesApply: false, isSelected: false },
  { id: 11, name: "Mental Health & Counselling Services", isFeesApply: true, isSelected: false },
  { id: 12, name: "Chronic Disease Med Review by Pharmacist", isFeesApply: false, isSelected: false },
  { id: 13, name: "Driver's Medical (NL only)", isFeesApply: true, isSelected: false },
  { id: 14, name: "Company Partner Appointment", isFeesApply: false, isSelected: false,desc:"If your employer or organization partners with Medicuro, please enter the company name below for access and billing.." },
  { id: 15, name: "Hep-C Screening and Treatment", isFeesApply: false, isSelected: false },
  { id: 16, name: "Warfarin / INR Management", isFeesApply: false, isSelected: false }
])




const [selectedItemId, setSelectedItemId] = useState(null)
const [isSubmitted,setIsSubmitted] = useState(false)

const handleSelectItem = (id) => {
    const temp = bookingItems.map((item) => {
        if (item.id === id) {
            setSelectedItemId(id)
            return { ...item, isSelected: !item.isSelected }
        }else{
            return {...item,isSelected: false}
        }
    })
    setBookingItems(temp)
}

const handleSubmit = () => {
    if(selectedItemId){
        setIsSubmitted(true)
    }else{
        alert("please select any one item")
    }
}

  return (
      <div className="bg-icef min-h-screen w-full justify-between">
         <div className="py-10   ps-7 ">
            <CommonBackBtn className="mb-32" label='Back to Dashboard' link='/dashboard'/>

            <div className='flex items-center justify-between container m-auto'>
                    <img className="" src={appointmentSideImage} alt="" />
                    <div className='bg-ocean p-10 rounded-xl w-850'>
                        {
                            (selectedItemId && isSubmitted) ? 
                                <div className='text-white'>
                                    <div className='text-xl mb-3'>{bookingItems[selectedItemId-1]?.name}</div>
                                    <div>{bookingItems[selectedItemId-1]?.desc}</div>
                                </div>
                            : 
                                <div className='text-white'>
                                    <div className='text-xl mb-3'>Select Service</div>
                                    <div>Due to increased demand, it may not be possible for our <br/> scheduling team to respond to all requests within 24 hours.</div>
                                </div>
                        }

                        {
                            (!selectedItemId || !isSubmitted) ? <div className='flex flex-col gap-4 mt-4 mb-10 '>
                                 <div className='text-white'>fees apply</div>
                                <div className='grid grid-cols-4 gap-2'>
                                    {
                                        bookingItems.map(({name,isFeesApply,isSelected,id},index) => {
                                            return <BookAppointmentItems id={id} onClick={handleSelectItem} isSelected={isSelected} name={name} key={index} isFeesApply={isFeesApply} />
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className='mt-10'> 
                                <BookAppointmentForm index={selectedItemId}/>
                            </div>
                        }

                        {
                            (!selectedItemId || !isSubmitted) &&
                            <div className='text-end'>
                                <button className='common-btn' onClick={() => handleSubmit() }>Next</button>
                            </div>
                        }
                    </div>


            </div>
           </div>
     </div>
  )
}

export default BookAppointment


const BookAppointmentItems = ({name,isFeesApply=false,isSelected=false,onClick=() => {},id}) => {
    return <div onClick={() => onClick(id)} className={cn("relative h-100 cursor-pointer text-center   rounded-md flex flex-col items-center justify-center  px-3 py-2 text-xs",isSelected ? "bg-teal-400" : "bg-teal-200")}>
        <div>{name}</div>
        {
            isFeesApply &&  <div className='absolute bottom-1 right-2 font-bold text-xl'> &#43;</div>
        }
       
    </div>
}


//seprate form for all items
const PhysicalAppointment = () => {
    return <div className='pb-10'>
        <div className='text-white font-bold mb-5'>Reason for Appointment</div>
        
        <textarea name="" id="" className='bg-white w-full' rows={10} ></textarea>
         <div className='text-end mt-5'>
            <button className='common-btn'>Send Request</button>
        </div>
    </div>
}

const MedicationRefill = () => {
    return <div className='flex flex-col gap-7'>
        <div>
            <div className='text-white text-xl'>Pharmacy</div>
            <CustomInput   inputclasses="bg-white"/>
        </div>

        <div className='flex flex-col gap-3'>
           <div>
                <div className='text-white text-xl'>Types of Medications & Dosage</div>
                <div className='text-sm text-white'>Enter medication name and dosage in fields below, or take a picture with your phone.</div>
           </div>

            <div>
                <CustomInput placeholder='e.g Metformin – 500mg twice daily for type 2 diabetes'  inputclasses="bg-white"/>
                <div className='mt-4'>
                    <div className='flex gap-3'>
                      <img src={cameraLogo} alt="" />
                      <div className='text-white'>Photos</div>
                    </div>
                    <div className='flex gap-2 mt-3'>
                        <img src={photoPlusLogo} alt="" />
                        <img src={photoPlusLogo} alt="" />
                        <img src={photoPlusLogo} alt="" />
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <div className='text-white'>Reason for Appointment</div>
                <CustomInput type='textarea' cols="10" rows="10" inputclasses=" w-full" />
            </div>
             <div className='text-end mt-5'>
            <button className='common-btn'>Send Request</button>
        </div>
        </div>

    </div>
}

const CompanyPartnerAppointment = () => {
    return <div className='flex flex-col gap-4 pb-10'> 
        <div>
            <div className='text-white'>My Company Name</div>
            <CustomInput />
        </div>

        <div>
            <div className='text-white'>Reason for Appointment</div>
            <CustomInput type='textarea' inputclasses="w-full outline-0" rows={10} />
        </div>

        <div className='text-end mt-5'>
            <button className='common-btn'>Send Request</button>
        </div>
    </div>
}

const NaturopathicMedicine = () => {
    return <div className='flex flex-col gap-5'>
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
                <CustomInput type='textarea' inputclasses="w-full" rows="7"  />
            </div>

            <div className='text-end mt-5'>
                <button className='common-btn'>Send Request</button>
            </div>
    </div>
}

//show dynamic forms
const BookAppointmentForm = ({index}) => {
    const allItems = {
        1 : PhysicalAppointment,
        2 : MedicationRefill,
        14 : CompanyPartnerAppointment,
        7 : NaturopathicMedicine
    }
    const SelectedComponent = allItems[index];
    return SelectedComponent ? <SelectedComponent/> : ""
}

//common select
const CommonSelectBox = ({options=[],className}) => {
    return <select className={cn("bg-white w-full h-45",className)}>
        {
            options.map(e => {
                return <option value={e.value}>{e.name}</option>
            })
        }
    </select>
}