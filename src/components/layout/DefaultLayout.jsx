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

      <div
        className={cn(
          openMenu ? 'md:ps-[182px]' : 'md:ps-[66px]',
          'transition-all pt-5'
        )}
      >
        <Outlet />
      </div>

      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  )
}
