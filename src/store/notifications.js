import { create } from 'zustand'

export const useNotificationStore = create(
    (set, get) => ({
      notifications: [],
      isLoading : false,
      setLoading : (status) => {
        set({isLoading:status})
      },
      setNotifications: (notifications) => {
        set({ notifications })
      },

      markAsRead: (ids) => {
        const { notifications } = get()
        set({
          notifications: notifications.map((notif) =>
            ids.includes(notif.id) ? { ...notif, isRead: true } : notif
          ),
        })
      },

      clearNotifications: () => {
        set({ notifications: [] })
      },
    }),
  )

