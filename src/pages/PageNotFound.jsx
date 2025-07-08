import { Link } from 'react-router-dom'
import MedicuroLogo from '../assets/images/medicuro-logo-icon-white.png' // Update path as needed
import AuthLayout from '../components/layout/AuthLayout'

function NotFoundPage() {
  return (
    <div className='relative z-10 min-h-screen flex flex-col justify-center items-center text-white space-y-6 text-center px-4 bg-dark h-screen auth-layout-gradient'>
      <div className='auth-layout-start pointer-events-none'></div>
      <div>
        <img src={MedicuroLogo} className='w-28 mx-auto mb-3' alt='Medicuro Logo' />
        <h1 className='text-4xl font-bold uppercase font-roboto-cond'>404</h1>
        <h2 className=' font-semibold mt-1 text-3xl'>Page Not Found</h2>
      </div>


      <Link
        to='/dashboard'
        className='py-2.5 px-10 text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit mt-4 hover:cursor-pointer hover:opacity-80'
      >
        Go to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage
