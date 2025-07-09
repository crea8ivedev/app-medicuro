import { NavLink, useNavigate } from 'react-router-dom'
import backBtnIcon from '../assets/images/back-btn.png'
import { cn } from '../utils/cn'

function CommonBackBtn({ label = '', link = '', className = '', onClick }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={cn('relative', className)}>
      {link ? (
        <NavLink to={link} className='flex gap-4 items-center w-fit cursor-pointer'>
          <img src={backBtnIcon} alt='' />
          <div className='text-navy text-2xl font-league mt-1'>{label}</div>
        </NavLink>
      ) : (
        <div onClick={() => handleClick()} className='flex gap-4 items-center w-fit cursor-pointer'>
          <img src={backBtnIcon} alt='' />
          <div className='text-navy text-2xl font-league mt-1'>{label}</div>
        </div>
      )}
    </div>
  )
}

export default CommonBackBtn
