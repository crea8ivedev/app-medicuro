import CommonBackBtn from '../components/CommonBackBtn'
import leftArrow from '../assets/images/left-arrow.png'
import faqIcon from '../assets/images/question-2.png'
import privacyIcon from '../assets/images/privacy-2.png'
import { NavLink, useSearchParams } from 'react-router-dom'
import { HelpCircle, ShieldCheck } from 'lucide-react'

function Help() {
  const [searchParams] = useSearchParams()
  const profile = searchParams.get('profile')
  const menuItems = [
    {
      label: 'FAQ’s',
      icon: faqIcon,
      action: 'navigate',
      route: profile ? '/faqs?profile=true' : '/faqs',
      Icon: HelpCircle,
    },
    {
      label: 'Privacy Policy',
      icon: privacyIcon,
      action: 'navigate',
      route: profile ? '/privacy?help=true' : '/privacy',
      Icon: ShieldCheck,
    },
  ]

  return (
    <div className='bg-sky-foam h-[calc(100dvh-64px)] md:h-auto 2xl:h-[calc(100dvh-93px)] pb-10 relative md:overflow-hidden'>
      <div className='common-bg absolute left-0 right-0 '></div>
      <div className='flex flex-col p-5'>
        <CommonBackBtn
          label={profile ? 'My Profile' : 'Back to Dashboard'}
          link={profile ? '/profile' : '/'}
        />
      </div>
      <div className='flex w-full justify-center items-center md:mt-15'>
        <div className='bg-mint relative w-825 p-10 flex flex-col gap-7 pb-36 rounded-xl'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>
          <div className='my-10'>
            {menuItems?.map((item, index) => {
              return (
                <NavLink key={index} to={item.route}>
                  <div
                    key={index}
                    onClick={item.onclick && item.onclick}
                    className='flex items-center justify-between max-w-xs m-auto py-2 px-2 rounded-md cursor-pointer hover:scale-105'
                  >
                    <div className='flex gap-5 items-center'>
                      <div className='h-40 w-40 flex items-center justify-center rounded-circle'>
                        <item.Icon size={30} />
                      </div>
                      <div className='text-xl font-semibold'>{item.label}</div>
                    </div>
                    {item.route && (
                      <div className='text-xl font-bold'>
                        <img src={leftArrow} alt='' />
                      </div>
                    )}
                  </div>
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
