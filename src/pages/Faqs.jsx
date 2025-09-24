import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CommonBackBtn from '../components/CommonBackBtn'
import { cn } from '../utils/cn'
import axiosInstance from '../utils/axios'
import { ChevronDown } from 'lucide-react'
import spinner from '../assets/images/spinner.gif'

function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const profile = searchParams.get('profile')

  const fetchFaqs = async () => {
    try {
      setLoading(true)
      const faqs = await axiosInstance.get('/api/v1/faqs')
      setFaqs(faqs.data?.faqs)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  return (
    <div className='bg-sky-foam min-h-screen pb-16 relative'>
      <div className='common-bg absolute left-0 right-0'></div>

      <div className='flex flex-col p-5'>
        <CommonBackBtn
          label='Help'
          link={profile ? '/help?profile=true' : '/help'}
        />
      </div>

      <div className='flex w-full justify-center items-center'>
        <div className='bg-mint relative w-825 pt-10 pb-36 px-5 md:px-10 flex flex-col md:mt-24 rounded-xl'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>

          {loading ? (
            <div className='flex justify-center items-center min-h-[300px]'>
              <img src={spinner} alt='Loading' className='w-10 h-10' />
            </div>
          ) : faqs.length ? (
            faqs.map((faq, index) => (
              <div
                key={index}
                className='my-3'
                onClick={() =>
                  setSelectedIndex(selectedIndex === index ? null : index)
                }
              >
                <div className='flex items-center justify-between bg-ice py-3 px-4 rounded-xl cursor-pointer'>
                  <div className='font-semibold'>{faq.question}</div>
                  <ChevronDown
                    className={cn(
                      'transition-all',
                      selectedIndex === index ? '-rotate-180' : '',
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'h-0 px-4 overflow-hidden transition-all font-semibold',
                    selectedIndex === index ? 'pt-7 pb-5 h-auto' : '',
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            ))
          ) : (
            <div className='text-white my-10 text-xl'>
              No FAQs available at this moment
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Faqs
