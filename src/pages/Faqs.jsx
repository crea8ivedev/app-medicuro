import { useEffect, useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import { cn } from '../utils/cn'

import arrow from "../assets/images/left-arrow.png"
import axiosInstance from '../utils/axios'
import FaqFallback from './fallbacks/FaqFallback'
import { ChevronDown , ChevronUp } from 'lucide-react'


function Faqs() {

    const [selectedIndex,setSelectedIndex] = useState(0)
    const [faqs , setFaqs] = useState([]);
    const [loading ,setLoading] = useState(false)

    const fetchFaqs = async () => {
        try {
            const faqs = await axiosInstance.get('/api/v1/faqs');
            setFaqs(faqs.data?.faqs)
        } catch (error) {
            
        }
    }

    useEffect(() => {
         fetchFaqs()
    },[]) 

return (
    <div className=' bg-sky-foam min-h-screen pb-16 relative'>
        <div className='common-bg absolute left-0 right-0'></div>
        <div className='flex flex-col p-5  '>
            <CommonBackBtn label='Help'  />
        </div>
        <div className='flex  w-full justify-center items-center '>
            <div className='bg-mint relative w-825 pt-10 pb-36 px-5  md:px-10 flex flex-col md:mt-24 rounded-xl '>
            <div className='common-right-design  z-10 bottom-5 right-5'></div>
                {
                  faqs.length  ?   faqs.map((faq,index) => {
                        return <div key={index} className='my-3' onClick={() => setSelectedIndex(selectedIndex ==  index ? null : index)}> 
                            <div className='flex items-center justify-between bg-ice py-3 px-4 rounded-xl cursor-pointer'>
                                <div className='font-semibold'>{faq.question}</div>
                                <ChevronDown className={cn(" transition-all",selectedIndex == index ? "-rotate-180" : "")} />
                            </div>
                            <div className={cn("h-0 px-4 overflow-hidden transition-all font-semibold",selectedIndex == index ? "pt-7 pb-5 h-auto" : "")}>{faq.answer}</div>
                        </div>
                    })
                    :
                    <FaqFallback/>
                }
            </div>
        </div>
    </div>
  )
}

export default Faqs