import { useState } from "react";
import { mockDoctors } from "./constants";

export const useHomeHook = () => {
  // const [selectedDoctor, setSelectedDoctor] = useState(null);
  // const [appointments, setAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [filters, setFilters] = useState({
    specialty: "All",
    availability: "All",
  });

  // Filtered doctors based on selected filters
  const filteredDoctors = mockDoctors.filter((doctor) => {
    return (
      (filters.specialty === "All" || doctor.specialty === filters.specialty) &&
      (filters.availability === "All" ||
        doctor.availability === filters.availability)
    );
  });

  // Handle opening the booking modal
  const handleBookAppointment = (doctor, setIsModalOpen, setSelectedDoctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    setSelectedTimeSlot("");
    // console.log({ doctor });
    // console.log({ selectedDoctor });
  };

  // Handle confirming an appointment
  const handleConfirmAppointment = (
    setActiveTab,
    setIsModalOpen,
    selectedDoctor,
    setSelectedDoctor,
    setAppointments,
    appointments
  ) => {
    if (selectedTimeSlot) {
      const newAppointment = {
        id: Date.now(),
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        location: selectedDoctor.location,
        dateTime: `April 22, 2025 - ${selectedTimeSlot}`,
        status: "Confirmed",
      };

      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);
      setSelectedDoctor(null);
      setSelectedTimeSlot("");
      setActiveTab("appointments");
    }
  };

  return {
    filters,
    setFilters,
    filteredDoctors,
    handleBookAppointment,
    handleConfirmAppointment,
    selectedTimeSlot,
    setSelectedTimeSlot,
    // selectedDoctor,
    // setSelectedDoctor,
    // appointments,
    // setAppointments,
  };
};
