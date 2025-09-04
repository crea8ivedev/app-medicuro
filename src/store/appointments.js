import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppointmentStore = create(
  persist(
    (set, get) => ({
      upcomingAppointments: [],
      pastAppointments: [],
      pendingRequests: [],

      setAppointments: ({ upcomingAppointments, pastAppointments }) => {
        set({
          upcomingAppointments,
          pastAppointments,
        })
      },

      setPendingRequests: (pendingRequests) => {
        set({ pendingRequests })
      },

      clearAppointments: () => {
        set({
          upcomingAppointments: [],
          pastAppointments: [],
          pendingRequests: []
        })
      }
      ,
      getAppointmentById: (id) => {
        const { upcomingAppointments, pastAppointments } = get()

        return (
          upcomingAppointments.find((appt) => appt.id === id) ||
          pastAppointments.find((appt) => appt.id === id) ||
          null
        )
      },
    }),
    {
      name: 'appointments-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
