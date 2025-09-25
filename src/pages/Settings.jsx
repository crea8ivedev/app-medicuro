import CommonBackBtn from '../components/CommonBackBtn'
import leftArrow from '../assets/images/left-arrow.png'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { KeyRound, Lightbulb, Trash2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

function Settings() {
  const user = useAuthStore((state) => state.user)

  const [searchParams] = useSearchParams()
  const profile = searchParams.get('profile')

  const menuItems = [
    {
      label: 'Notification Setting',
      icon: Lightbulb,
      action: 'navigate',
      route: '/notifications/settings',
    },

    ...(user?.provider != 'google' && user?.provider != 'facebook'
      ? [
          {
            label: 'Password Manager',
            icon: KeyRound,
            action: 'navigate',
            route: profile ? '/password/reset?profile=true' : '/password/reset',
          },
        ]
      : []),
    {
      label: 'Delete Account',
      icon: Trash2,
      action: 'navigate',
      route: '/profile/account/delete',
    },
  ]

  return (
    <div className='bg-sky-foam min-h-[calc(100dvh-60px)] 2xl:min-h-[calc(100dvh-93px)] md:pb-10 relative'>
      <div className='common-bg absolute left-0 right-0'></div>

      <div className='flex flex-col p-5'>
        <CommonBackBtn
          label={profile ? 'My Profile' : 'Back to Dashboard'}
          link={profile ? '/profile' : '/'}
        />
      </div>

      <div className='flex w-full justify-center items-center lg:mt-15'>
        <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 rounded-xl'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>
          <div className='my-10'>
            {menuItems?.map((item, index) => (
              <NavLink key={index} to={item.route}>
                <div className='flex items-center justify-between max-w-xs m-auto py-3 rounded-md hover:scale-105 px-2 cursor-pointer transition-all duration-75'>
                  <div className='flex gap-5 items-center'>
                    <div className='h-40 w-40 flex items-center justify-center rounded-circle'>
                      <item.icon size={30} />
                    </div>
                    <div className='sm:text-xl font-semibold'>{item.label}</div>
                  </div>
                  {item.route && (
                    <div className='text-xl font-bold'>
                      <img src={leftArrow} alt='' />
                    </div>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
