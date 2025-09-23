import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import { cn } from '../../utils/cn'

export default function DefaultLayout() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className='h-screen'>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />

      <div className=' pt-[60px] md:pt-0 md:ps-[66px]'>
        <Outlet />
      </div>

      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  )
}
