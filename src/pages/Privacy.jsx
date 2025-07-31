import { useEffect, useState } from 'react';
import CommonBackBtn from '../components/CommonBackBtn'
import { useAuthStore } from '../store/auth';
import axiosInstance from '../utils/axios';
import spinner from "../assets/images/spinner.gif"


function Privacy() {

    const { user } = useAuthStore();

    const [terms, setTerms] = useState([]);

    const fetchTerms = async () => {
        const res = await axiosInstance.get("/api/v1/terms");
        setTerms(res.data)
    }

    useEffect(() => {
        fetchTerms()
    }, [])

    return (
        <div className='bg-sky-foam min-h-screen pb-16 relative'>
            <div className='common-bg absolute left-0 right-0'></div>
            {
                user?.fullName &&
                <div className='flex flex-col p-5'>
                    <CommonBackBtn label='Privacy Policy' />
                </div>
            }
            <div className='flex w-full justify-center items-center md:mt-24'>
                <div className='bg-mint relative w-825 pt-10 pb-36 md:px-10 px-5 flex flex-col rounded-xl'>
                    <div className='common-right-design  z-10 bottom-5 right-5'></div>

   
                    <div className='flex flex-col gap-5'>
                        {
                            !terms.length  ? 
                             <img src={spinner} className='w-20 m-auto' alt='loading' />
                            : terms.map(t => {
                                return Object.entries(t).map(([key, value], index) => {
                                    return <div >
                                        {
                                            key ?
                                                (
                                                    <div className='flex flex-col gap-1'>
                                                        <div className='text-ocean font-bold mt-4 text-xl'>{key.replaceAll("_" ," ")}</div>
                                                        <div>
                                                            {
                                                                typeof value == "string" ? <div>{value} </div> : <div>
                                                                    <ul className='list-decimal px-10 md:px-5'>
                                                                        {
                                                                            value.map((item, index) => {
                                                                                return <li className='my-3' index={index}>{item}</li>


                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>

                                                            }
                                                        </div>
                                                    </div>

                                                ) : <div className='flex  flex-col gap-5'>
                                                    {
                                                        Array.isArray(value) && value?.map((terms, index) => {
                                                            return <div index={index}> {terms} </div>
                                                        })
                                                    }
                                                </div>
                                        }

                                    </div>
                                })
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Privacy
