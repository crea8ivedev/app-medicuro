import { NavLink, useNavigate } from 'react-router-dom';
import backBtnIcon from '../assets/images/back-btn.png';
import { cn } from '../utils/cn';

function CommonBackBtn({ label = "", link = "" ,className="",onClick}) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); 
    }
  };

  return <div className={cn("flex gap-4 items-center cursor-pointer",className)}>
        <div className='cursor-pointer relative mb-0.5'>
                {
                  link ? <NavLink to={link}><img src={backBtnIcon} alt='' /></NavLink> : <div onClick={() => handleClick()}><img src={backBtnIcon} alt='' /></div>
                }
        </div>

        <div className='text-navy text-2xl font-league'>
          {label}
        </div>
      </div>
}




export default CommonBackBtn
