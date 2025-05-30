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
          user: {
            fullName: '',
            // profile: '',
          },
          token: null,
        })
      },

      profileUpdate: ({ name, profile }) => {
        const { token } = get()
        set({
          user: { name, profile },
          token,
        })
      },
    }),
    {
      name: 'medicuro-webapp',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
