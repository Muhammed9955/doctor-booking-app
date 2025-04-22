import React from "react";
import { useAppointmentStore } from "../stroe/useAppointmentStore";

export default function BookingModal() {
  const {
    selectedTimeSlot,
    getAvailableTimeSlots,
    selectedDoctor,
    setSelectedTimeSlot,
    setIsModalOpen,
    handleConfirmAppointment,
  } = useAppointmentStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
        role="dialog"
        aria-labelledby="booking-modal-title"
        aria-modal="true"
      >
        <h2 id="booking-modal-title" className="text-xl font-bold mb-4">
          Book Appointment with {selectedDoctor.name}
        </h2>
        <p className="text-gray-600 mb-4">
          {selectedDoctor.specialty} • {selectedDoctor.location}
        </p>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Select Available Time:</h3>
          <div className="grid grid-cols-2 gap-2">
            {getAvailableTimeSlots(selectedDoctor.availability).map((time) => (
              <button
                key={time}
                className={`border rounded-lg p-2 text-center 
                ${
                  selectedTimeSlot === time
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedTimeSlot(time)}
                aria-pressed={selectedTimeSlot === time}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTimeSlot
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleConfirmAppointment}
            disabled={!selectedTimeSlot}
            aria-disabled={!selectedTimeSlot}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
