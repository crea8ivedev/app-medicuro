import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth';

function PublicRoute() {
    const { user } = useAuthStore()
  
      return (
         user?.fullName ? <Navigate to="/dashboard" /> : <Outlet />
    )
}

export default PublicRoute