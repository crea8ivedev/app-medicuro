import { useLocation } from 'react-router-dom'
import DashboardFallback from './dashboarsFallback'
import BookAppointmentSkeleton from './BookAppointmentFallback'
import NotificationsFallback from './NotificationsFallback'
import SettingsFallback from './SettingsFallback'
import HelpFallback from './HelpFallback'
import AuthScreenFallback from './AuthScreenFallback'
import LoginFallback from './LoginFallback'
import SignupTermsFallback from './SignupTermsFallback'
import Spinner from '../../assets/images/spinner.gif'

const FallbackSkeleton = ({ showHeader = true }) => {
  const location = useLocation()

  const pathParts = location.pathname.split('/').filter(Boolean)
  let type = pathParts[0] || 'auth'
  if (type === 'patients' && pathParts.length > 1) type = 'patients-id'

  const fallbackComponents = {
    dashboard: <DashboardFallback />,
    'book-appointment': <BookAppointmentSkeleton />,
    notifications: <NotificationsFallback />,
    settings: <SettingsFallback />,
    help: <HelpFallback />,
    auth: <AuthScreenFallback />,
    login: <LoginFallback />,
    signup: <SignupTermsFallback />,
  }

  const Child = () => {
    return (
      <div className='flex items-center justify-center w-full p-6 h-[100dvh]'>
        <img
          src={Spinner}
          alt='Loading...'
          className='w-12 h-12 animate-spin'
        />
      </div>
    )
  }

  return <Child />
}

export default FallbackSkeleton
