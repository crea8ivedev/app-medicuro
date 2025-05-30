import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],

      setNotifications: (notifications) => {
        set({ notifications })
      },

      markAsRead: (id) => {
        const { notifications } = get()
        set({
          notifications: notifications.map((notif) =>
            notif.id === id ? { ...notif, isRead: true } : notif
          ),
        })
      },

      clearNotifications: () => {
        set({ notifications: [] })
      },

      getNotificationById: (id) => {
        const { notifications } = get()
        return notifications.find((notif) => notif.id === id) || null
      },
    }),
    {
      name: 'medicuro-notifications',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
