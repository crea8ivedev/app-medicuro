import { useEffect, useState } from 'react'
import CommonBackBtn from '../components/CommonBackBtn'
import CustomToggleSwitch from '../components/CustomToggleSwitch'
import axiosInstance from '../utils/axios'
import { useAuthStore } from '../store/auth'
import { showToast } from '../utils/toast'

function NotificationsSettings() {
  const { user, changeNotificationSettings } = useAuthStore()

  const [generalNotification, setGeneralNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user?.generalNotification !== undefined) {
      setGeneralNotification(user.generalNotification)
    }
  }, [user])

  const handleChange = async (isChecked) => {
    setIsLoading(true)
    setGeneralNotification(isChecked)

    try {
      const response = await axiosInstance.post("/api/v1/auth/profile/notification/setting/update", {
        generalNotification: isChecked,
      })

      if (response.data?.statusCode === 200 && response.data?.data) {
        showToast.success(response.data.message)
        changeNotificationSettings(isChecked)
      }
    } catch (err) {
      showToast.error("Something went wrong")
      setGeneralNotification(!isChecked)
    } finally {
      setIsLoading(false)
    }
  }

  const menuItems = [
    {
      label: "General Notification",
      toggle: true
    }
  ];

  return (
    <div className='bg-sky-foam h-screen pb-16 relative'>
      <div className='common-bg'></div>

      <div className='flex flex-col p-5'>
        <CommonBackBtn label='Settings' />
      </div>

      <div className='flex w-full justify-center items-center md:mt-24'>
        <div className='bg-mint relative w-825 md:p-10 p-5 flex flex-col gap-7'>
          <div className='common-right-design z-10 bottom-5 right-5'></div>

          <div className='my-10'>
            {
              menuItems?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={item.onclick && item.onclick}
                    className='flex items-center justify-between max-w-md m-auto my-4 cursor-pointer gap-15'
                  >
                    <div className='flex gap-5 items-center'>
                      <div className='sm:text-xl font-semibold'>{item.label}</div>
                    </div>
                    <div>
                      {
                        item.toggle ? (
                          <CustomToggleSwitch
                            checked={generalNotification}
                            onChange={handleChange}
                            disabled={isLoading}
                          />
                        ) : null
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsSettings
