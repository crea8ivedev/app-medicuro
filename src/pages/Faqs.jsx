import { useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import { cn } from '../utils/cn'

import arrow from "../assets/images/left-arrow.png"



function Faqs() {

    const [selectedIndex,setSelectedIndex] = useState(0)

    const faqs = [
        {question : "Lorem ipsum dolor sit amet?",answer : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."},
        {question : "Lorem ipsum dolor sit amet?",answer : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."},
        {question : "Lorem ipsum dolor sit amet?",answer : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."},
        {question : "Lorem ipsum dolor sit amet?",answer : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."},
        {question : "Lorem ipsum dolor sit amet?",answer : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."},
    ]
    
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
                    faqs.map((faq,index) => {
                        return <div key={index} className='my-3' onClick={() => setSelectedIndex(index)}> 
                            <div className='flex items-center justify-between bg-ice py-3 px-4 rounded-xl cursor-pointer'>
                                <div className='font-semibold'>{faq.question}</div>
                                <img src={arrow} alt="" className={cn("rotate-90 transition-all",selectedIndex == index ? "-rotate-90" : "")} />
                            </div>
                            <div className={cn("h-0 overflow-hidden transition-all font-semibold",selectedIndex == index ? "pt-7 pb-5 h-auto" : "")}>{faq.answer}</div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Faqs