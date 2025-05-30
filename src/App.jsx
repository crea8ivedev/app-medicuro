import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Signup from './pages/auth/Signup'
import Auth from './pages/auth/Auth'
import PublicRoute from './config/PublicRoute.jsx'
import PageNotFound from './pages/PageNotFound'
import AuthLayout from './components/layout/AuthLayout'
import DefaultLayout from './components/layout/DefaultLayout'
import PrivateRoute from './config/PrivateRoute'
import Logout from './pages/auth/Logout'
import SetPassword from './pages/auth/SetPassword'
import BookAppointmentIndexPage from './pages/BookAppointment/index'
import CancelAppointment from './pages/CancelAppointment'
import RebookAppointment from './pages/RebookAppointment'
import ViewlAppointment from './pages/ViewlAppointment'
import Notifications from './pages/Notifications'
import MyProfile from './pages/MyProfile'
import Settings from './pages/Settings'
import NotificationsSettings from './pages/NotificationsSettings'
import PasswordReset from './pages/PasswordReset'
import Help from './pages/Help'
import Privacy from './pages/Privacy'
import Faqs from './pages/Faqs'
import DeleteAccount from './pages/auth/DeleteAccount'
import UpdateProfile from './pages/UpdateProfile'
import ForgetPassword from './pages/auth/ForgetPassword.jsx'

function App() {
  return (
    <Routes>
      <Route path='/*' element={<PageNotFound />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route index path='/' element={<Auth />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/auth/reset-password' element={<SetPassword />} />
        <Route path='/auth/forget-password' element={<ForgetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/profile' element={<MyProfile />} />
          <Route path='/profile/update' element={<UpdateProfile />} />

          <Route path='/notifications' element={<Notifications />} />

          <Route path='/settings' element={<Settings />} />
          <Route path='/notifications/settings' element={<NotificationsSettings />} />
          <Route path='/password/reset' element={<PasswordReset />} />

          <Route path='/help' element={<Help />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/faqs' element={<Faqs />} />

          <Route path='/book-appointment' element={<BookAppointmentIndexPage />} />
          <Route path='/cancel-appointment/:id' element={<CancelAppointment />} />
          <Route path='/rebook-appointment/:id' element={<RebookAppointment />} />
          <Route path='/view-appointment/:type/:id' element={<ViewlAppointment />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/log-out' element={<Logout />} />
          <Route path='/profile/account/delete' element={<DeleteAccount />} />
        </Route>
      </Route>

    </Routes>
    
  )
}

export default App
