import { useLocation } from 'react-router-dom'
import DashboardFallback from './dashboarsFallback'
import BookAppointmentSkeleton from './BookAppointmentFallback'
import NotificationsFallback from './NotificationsFallback'
import SettingsFallback from './SettingsFallback'
import HelpFallback from './HelpFallback'
import AuthScreenFallback from './AuthScreenFallback'
import LoginFallback from './LoginFallback'
import SignupTermsFallback from './SignupTermsFallback'

const FallbackSkeleton = ({ showHeader = true }) => {
  const location = useLocation()

  const pathParts = location.pathname.split('/').filter(Boolean)
  let type = pathParts[0] || 'auth'
  if (type === 'patients' && pathParts.length > 1) type = 'patients-id'

  const fallbackComponents = {
    dashboard: <DashboardFallback />,
    "book-appointment" : <BookAppointmentSkeleton/>,
    notifications : <NotificationsFallback/>,
    settings : <SettingsFallback/>,
    help : <HelpFallback/>,
    "auth" : <AuthScreenFallback/>,
    "login" : <LoginFallback/>,
    "signup" : <SignupTermsFallback/>
  }

  const independant = ["auth","help","login","signup"]

  const fallbackContent = fallbackComponents[type]

  const Child = () => {
    return  <div className="p-6 space-y-4">
          {fallbackContent ? (
            fallbackContent
          ) : (
            <>
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-11/12 bg-gray-200 rounded" />
              <div className="h-3 w-4/5 bg-gray-300 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
            </>
          )}
        </div>
  }

  return (
    <div>
      {
        independant?.includes(type) ? <Child/>  :
        <div className="flex h-screen bg-sky-foam overflow-hidden relative animate-pulse">
      {/* Sidebar Skeleton */}
      
        <div className="fixed top-0 left-0 h-screen w-66 hidden md:flex flex-col z-10 bg-navy p-4 gap-6">
          {/* Profile Circle */}
          <div className="w-10 h-10 bg-gray-600 rounded-full self-center mb-6" />
          {/* Menu Icons */}
          <div className="flex flex-col gap-6 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-6 bg-gray-500 rounded" />
            ))}
          </div>
        </div>
      

      {/* Main Layout */}
      <div className="flex-1 w-full md:ps-66">
        {/* Header Skeleton */}
        {showHeader && (
          <div className="md:h-[93px] md:ps-[90px] bg-white flex items-center px-4 py-6 gap-6">
            {/* Mobile Burger Icon */}
            <div className="md:hidden w-8 h-6 bg-gray-300 rounded" />

            {/* Welcome Text */}
            <div className="hidden md:flex flex-col gap-2">
              <div className="h-3 w-40 bg-gray-300 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>

            {/* Next Appointment Box */}
            <div className="hidden md:flex flex-col bg-gray-200 py-3 px-8 rounded-xl gap-2">
              <div className="h-2 w-32 bg-gray-300 rounded" />
              <div className="h-2 w-24 bg-gray-400 rounded" />
            </div>
          </div>
        )}

        {/* Page Skeleton Content */}
        <Child/>
    
      </div>
    </div>
      }

    </div>
    
  )
}

export default FallbackSkeleton
