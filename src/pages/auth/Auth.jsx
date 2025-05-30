import React from 'react'
import MedicuroLogo from '../../assets/images/medicuro-logo-icon-white.png'
import { Link } from 'react-router-dom'
export default function Auth() {
  return (
    <div className='relative z-10 min-h-full flex flex-col justify-center items-center text-white space-y-6 text-center'>
      <div>
        <img src={MedicuroLogo} className='w-100 mx-auto  mb-2' />
        <h1 className='text-4xl font-bold uppercase font-roboto-cond'>
          {' '}
          MEDICURO
        </h1>
        <h6 className='capitalize text-xl'>NL’s Trusted Virtual Clinic</h6>
      </div>

      <div>
        <p>
          Your secure gateway to professional <br /> virtual healthcare. Please
          register to <br />
          begin or log in to access your account.
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <Link
          to='/login'
          className='py-2.5 px-10 text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit'
        >
          Log In
        </Link>
        <Link
          to='signup'
          className='py-2.5 px-10  text-center text-base rounded-md bg-aqua text-ocean cursor-pointer font-outfit'
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}
