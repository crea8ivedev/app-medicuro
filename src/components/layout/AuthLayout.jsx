import { Outlet } from 'react-router-dom'
import Container from '../Container'

export default function AuthLayout() {
  return (
    <div className='h-screen auth-layout-gradient'>
      <div className='auth-layout-start'></div>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
