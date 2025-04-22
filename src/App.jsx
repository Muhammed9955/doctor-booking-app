// src/App.jsx
import React from "react";
import { Calendar, Clock, MapPin, Star, Filter, Book } from "lucide-react";
import { useAppointmentStore } from "./stroe/useAppointmentStore";

import DoctorCard from "./components/DoctorCard";
import AppointmentCard from "./components/AppointmentCard";
import Header from "./components/Header";
import BookingModal from "./components/BookingModal";
import Taps from "./components/Taps";
import DoctorDirectoryView from "./components/DoctorDirectoryView";
import AppointmentsView from "./components/AppointmentsView";

// Main App Component
export default function App() {
  // Use our updated Zustand store with more functions
  const { selectedDoctor, isModalOpen, activeTab } = useAppointmentStore();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Header />

      {/* Tabs for navigation */}
      <Taps />

      {/* Doctor Directory View */}
      {activeTab === "doctors" && <DoctorDirectoryView />}

      {/* Appointments View */}
      {activeTab === "appointments" && <AppointmentsView />}

      {/* Booking Modal */}
      {isModalOpen && selectedDoctor && <BookingModal />}
    </div>
  );
}
