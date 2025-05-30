import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppointmentStore = create(
  persist(
    (set,get) => ({
      upcomingAppointments: [],
      pastAppointments: [],

      setAppointments: ({ upcomingAppointments, pastAppointments }) => {
        set({
          upcomingAppointments,
          pastAppointments,
        })
      },

      clearAppointments: () => {
        set({
          upcomingAppointments: [],
          pastAppointments: [],
        })
      },

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
      name: 'medicuro-appointments',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
