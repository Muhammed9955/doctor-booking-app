import React from "react";
import AppointmentCard from "./AppointmentCard";
import { useAppointmentStore } from "../stroe/useAppointmentStore";

export default function AppointmentsView() {
  const { appointments } = useAppointmentStore();
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500 py-4">
          You have no scheduled appointments.
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
