// tests/App.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { useAppointmentStore } from "../stroe/useAppointmentStore";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Doctor Appointment Booking App with Enhanced Zustand Store", () => {
  // Reset Zustand store and mocks before each test
  beforeEach(() => {
    // Reset the store to initial state
    useAppointmentStore.setState({
      appointments: [],
      selectedDoctor: null,
      isModalOpen: false,
      selectedTimeSlot: "",
      activeTab: "doctors",
      filters: {
        specialty: "All",
        availability: "All",
      },
    });

    // Clear localStorage mock
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Store Functions", () => {
    it("should filter doctors correctly", () => {
      // Set a filter in the store
      useAppointmentStore.getState().updateFilter("specialty", "Cardiology");

      // Get filtered doctors
      const filteredDoctors = useAppointmentStore
        .getState()
        .getFilteredDoctors();

      // Should only return cardiology doctors
      expect(filteredDoctors.length).toBe(2);
      expect(filteredDoctors[0].name).toBe("Dr. Sarah Johnson");
      expect(filteredDoctors[1].name).toBe("Dr. Lisa Patel");
    });

    it("should handle booking appointment correctly", () => {
      const store = useAppointmentStore.getState();
      const doctor = store.doctors[0]; // Dr. Sarah Johnson

      // Call the handleBookAppointment function
      store.handleBookAppointment(doctor);

      // Check if store state was updated correctly
      expect(store.selectedDoctor).toBe(doctor);
      expect(store.isModalOpen).toBe(true);
      expect(store.selectedTimeSlot).toBe("");
    });

    it("should handle confirming appointment correctly", () => {
      const store = useAppointmentStore.getState();

      // Setup state for confirmation
      store.setSelectedDoctor(store.doctors[0]); // Dr. Sarah Johnson
      store.setSelectedTimeSlot("10:00 AM");

      // Should return true for success
      expect(store.handleConfirmAppointment()).toBe(true);

      // Should have added an appointment
      expect(store.appointments.length).toBe(1);
      expect(store.appointments[0].doctorName).toBe("Dr. Sarah Johnson");
      expect(store.appointments[0].dateTime).toContain("10:00 AM");

      // Should have reset booking state
      expect(store.selectedDoctor).toBe(null);
      expect(store.isModalOpen).toBe(false);
      expect(store.selectedTimeSlot).toBe("");

      // Should have switched to appointments tab
      expect(store.activeTab).toBe("appointments");
    });

    it("should get available time slots for a doctor", () => {
      const store = useAppointmentStore.getState();

      // Morning time slots
      const morningSlots = store.getAvailableTimeSlots("Morning");
      expect(morningSlots).toEqual([
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
      ]);

      // Evening time slots
      const eveningSlots = store.getAvailableTimeSlots("Evening");
      expect(eveningSlots).toEqual([
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
      ]);
    });
  });

  describe("Component Integration with Store", () => {
    it("should render with store data and filter doctors correctly", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Initially shows all doctors
      expect(
        screen.getAllByRole("button", { name: /book appointment with/i }).length
      ).toBe(6);

      // Select Cardiology
      await user.selectOptions(
        screen.getByLabelText(/specialty:/i),
        "Cardiology"
      );

      // Should update the store
      expect(useAppointmentStore.getState().filters.specialty).toBe(
        "Cardiology"
      );

      // Should only show cardiology doctors
      expect(
        screen.getAllByRole("button", { name: /book appointment with/i }).length
      ).toBe(2);
      expect(screen.getByText("Dr. Sarah Johnson")).toBeInTheDocument();
      expect(screen.getByText("Dr. Lisa Patel")).toBeInTheDocument();
    });

    it("should handle the complete appointment booking flow", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Book with Dr. Sarah Johnson
      await user.click(
        screen.getAllByRole("button", { name: /book appointment with/i })[0]
      );

      // Modal should be open
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Select a time slot
      await user.click(screen.getByText("9:00 AM"));

      // Confirm appointment
      await user.click(
        screen.getByRole("button", { name: /confirm appointment/i })
      );

      // Should have added an appointment to the store
      const appointments = useAppointmentStore.getState().appointments;
      expect(appointments.length).toBe(1);
      expect(appointments[0].doctorName).toBe("Dr. Sarah Johnson");

      // Should switch to appointments tab and show the appointment
      expect(
        screen
          .getByRole("tab", { name: /my appointments/i })
          .getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText(/April 22, 2025 - 9:00 AM/)).toBeInTheDocument();
    });
  });

  describe("localStorage Persistence", () => {
    it("should persist appointments to localStorage", async () => {
      const user = userEvent.setup();
      render(<App />);

      // Make an appointment
      await user.click(
        screen.getAllByRole("button", { name: /book appointment with/i })[0]
      );
      await user.click(screen.getByText("9:00 AM"));
      await user.click(
        screen.getByRole("button", { name: /confirm appointment/i })
      );

      // Should have saved to localStorage
      expect(localStorage.setItem).toHaveBeenCalled();

      // Find the localStorage call for our store
      const storageKey = "doctor-appointments-storage";
      const storageCalls = localStorage.setItem.mock.calls.filter(
        (call) => call[0] === storageKey
      );

      // Parse the stored data
      const storedData = JSON.parse(storageCalls[storageCalls.length - 1][1]);

      // Verify it has the right structure and content
      expect(storedData.state).toHaveProperty("appointments");
      expect(storedData.state.appointments.length).toBe(1);
      expect(storedData.state.appointments[0].doctorName).toBe(
        "Dr. Sarah Johnson"
      );
    });
  });
});
