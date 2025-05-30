import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { useAuthStore } from '../store/auth';

function PrivateRoute() {

const {user } = useAuthStore()

  return (
    user?.fullName ? <Outlet/> :  <Navigate to="/" />
  )
}

export default PrivateRoute