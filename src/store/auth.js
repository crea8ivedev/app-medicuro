import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        fullName: '',
        profile: '',
      },
      login: ({ user }) => {
        set({ user })
      },

      logout: () => {
        set({
          user: {},
        })
      },
      changeNotificationSettings: (isChecked) => {
        const { user } = get()
        set({
          user: {
            ...user,
            generalNotification: isChecked,
          },
        })
      },
    }),
    {
      name: 'medicuro-webapp',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
