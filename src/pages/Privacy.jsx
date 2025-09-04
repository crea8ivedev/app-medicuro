import CommonBackBtn from '../components/CommonBackBtn'
import Privacy from '../components/Privacy';
import { useAuthStore } from '../store/auth';

function PrivacyPage() {
    const { user } = useAuthStore();
    
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
                        <Privacy/>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPage
