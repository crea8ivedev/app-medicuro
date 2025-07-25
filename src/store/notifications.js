import { create } from 'zustand'
import axiosInstance from '../utils/axios'

export const useNotificationStore = create(
  (set, get) => ({
    notifications: [],
    isLoading: false,
    setLoading: (status) => {
      set({ isLoading: status })
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

    getNotifications: async () => {
      try {
        set({ isLoading: true });
        const response = await axiosInstance.get('/api/v1/notifications?paginate=false');
        if (response?.data?.statusCode === 200) {
          const data = response.data?.notifications;
          set({ notifications: data });
        }
      } catch (error) {
      } finally {
        set({ isLoading: false });
      }
    },
  }),
)

