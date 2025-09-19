import { NavLink, useNavigate } from 'react-router-dom'
import backBtnIcon from '../assets/images/back-btn.png'
import backBtnIconWhite from '../assets/images/white-back-arrow.svg'


import { cn } from '../utils/cn'
import { ChevronDown } from 'lucide-react'

function CommonBackBtn({ label = '', link = '', className = '', onClick , varient="blue" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {varient == "white"
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={cn('relative hover:opacity-70', className)}>
      {link ? (
        <NavLink to={link} className='flex gap-2 items-center w-fit cursor-pointer '>
          {/* <img src={varient == "white" ? backBtnIconWhite :  backBtnIcon} alt='back-button' /> */}
          <ChevronDown className={cn('rotate-90 text-navy' , varient == "white" ? "text-white" : "text-navy")} size={30} />

          <div className={cn("text-navy text-2xl font-league mt-1",varient == "white" ? "text-white" : "")}>{label}</div>
        </NavLink>
      ) : (
        <div onClick={() => handleClick()} className='flex gap-2 items-center w-fit cursor-pointer'>
          {/* <img src={varient == "white" ? backBtnIconWhite :  backBtnIcon} alt='back button' /> */}
          <ChevronDown className={cn('rotate-90 text-navy' , varient == "white" ? "text-white" : "text-navy")} size={30} />
          <div className={cn("text-navy text-2xl font-league mt-1",varient == "white" ? "text-white" : "")}>{label}</div>
        </div>
      )}
    </div>
  )
}

export default CommonBackBtn
