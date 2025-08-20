import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import PublicRoute from './config/PublicRoute.jsx'
import PrivateRoute from './config/PrivateRoute.jsx'
import ConditionalRoute from './config/conditionalRoute.jsx'
import { useAuthStore } from './store/auth.js'
import FallbackSkeleton from './pages/fallbacks/index.jsx'
import NewGoogle from './pages/new-google.jsx'
import FacebookLoginButton from './pages/new-facebook.jsx'

// Layouts
const AuthLayout = lazy(() => import('./components/layout/AuthLayout'))
const DefaultLayout = lazy(() => import('./components/layout/DefaultLayout'))

// Auth Pages
const Auth = lazy(() => import('./pages/auth/Auth'))
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const Logout = lazy(() => import('./pages/auth/Logout'))
const SetPassword = lazy(() => import('./pages/auth/SetPassword'))
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword.jsx'))
const DeleteAccount = lazy(() => import('./pages/auth/DeleteAccount'))

// Main Pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BookAppointmentIndexPage = lazy(() => import('./pages/BookAppointment/index'))
const CancelAppointment = lazy(() => import('./pages/CancelAppointment'))
const RebookAppointment = lazy(() => import('./pages/RebookAppointment'))
const ViewlAppointment = lazy(() => import('./pages/ViewlAppointment'))
const Notifications = lazy(() => import('./pages/Notifications'))
const MyProfile = lazy(() => import('./pages/MyProfile'))
const UpdateProfile = lazy(() => import('./pages/UpdateProfile'))
const Settings = lazy(() => import('./pages/Settings'))
const NotificationsSettings = lazy(() => import('./pages/NotificationsSettings'))
const PasswordReset = lazy(() => import('./pages/PasswordReset'))
const Help = lazy(() => import('./pages/Help'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Faqs = lazy(() => import('./pages/Faqs'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))


function App() {
  const { user } = useAuthStore()

  return (
    <Suspense fallback={<FallbackSkeleton/>}>
      <Routes>
        <Route path="/*" element={<PageNotFound />} />
        <Route path='/app/google/login' element={<NewGoogle/>} />
        <Route path='/app/facebook/login' element={<FacebookLoginButton/>} />

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route index path="/" element={<Auth />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<SetPassword />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications/settings" element={<NotificationsSettings />} />
            <Route path="/password/reset" element={<PasswordReset />} />
            <Route path="/help" element={<Help />} />

            {user?.fullName && (
              <>
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faqs" element={<Faqs />} />
              </>
            )}

            <Route path="/book-appointment" element={<BookAppointmentIndexPage />} />
            <Route path="/cancel-appointment/:id" element={<CancelAppointment />} />
            <Route path="/rebook-appointment/:id" element={<RebookAppointment />} />
            <Route path="/view-appointment/:type/:id" element={<ViewlAppointment />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/log-out" element={<Logout />} />
            <Route path="/profile/account/delete" element={<DeleteAccount />} />
          </Route>
        </Route>

        <Route element={<ConditionalRoute />}>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faqs" element={<Faqs />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
