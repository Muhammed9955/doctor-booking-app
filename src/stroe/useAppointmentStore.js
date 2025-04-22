// src/store/useAppointmentStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockDoctors, timeSlots } from "../utils/constants";

// Create appointment store with persistence
export const useAppointmentStore = create(
  persist(
    (set, get) => ({
      // State
      doctors: mockDoctors,
      timeSlots,
      appointments: [],
      selectedDoctor: null,
      isModalOpen: false,
      selectedTimeSlot: "",
      activeTab: "doctors",
      filters: {
        specialty: "All",
        availability: "All",
      },

      // Computed properties (as functions)
      getFilteredDoctors: () => {
        const { doctors, filters } = get();
        return doctors.filter((doctor) => {
          return (
            (filters.specialty === "All" ||
              doctor.specialty === filters.specialty) &&
            (filters.availability === "All" ||
              doctor.availability === filters.availability)
          );
        });
      },

      // Action to get available time slots for a doctor
      getAvailableTimeSlots: (doctorAvailability) => {
        return get().timeSlots[doctorAvailability] || [];
      },

      // Actions
      setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setFilters: (filters) => set({ filters: filters }),

      // Add new appointment
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),

      // Reset booking state after appointment is booked
      resetBookingState: () =>
        set({
          selectedDoctor: null,
          isModalOpen: false,
          selectedTimeSlot: "",
        }),

      // Update filter for specialty or availability
      updateFilter: (filterType, value) =>
        set((state) => ({
          filters: { ...state.filters, [filterType]: value },
        })),

      // Handle opening the booking modal - moved from App.jsx
      handleBookAppointment: (doctor) => {
        const { setSelectedDoctor, setIsModalOpen, setSelectedTimeSlot } =
          get();
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
        setSelectedTimeSlot("");
      },

      // Handle confirming an appointment - moved from App.jsx
      handleConfirmAppointment: () => {
        const {
          selectedTimeSlot,
          selectedDoctor,
          addAppointment,
          resetBookingState,
          setActiveTab,
        } = get();

        if (selectedTimeSlot && selectedDoctor) {
          const newAppointment = {
            id: Date.now(),
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            location: selectedDoctor.location,
            dateTime: `April 22, 2025 - ${selectedTimeSlot}`,
            status: "Confirmed",
          };

          addAppointment(newAppointment);
          resetBookingState();
          setActiveTab("appointments");
          return true; // Return success status
        }
        return false; // Return failure status
      },
    }),
    {
      name: "doctor-appointments-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist appointments
      partialize: (state) => ({ appointments: state.appointments }),
    }
  )
);

// Export specialties for use in components
export const specialties = [
  "All",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Neurology",
  "Orthopedics",
];
