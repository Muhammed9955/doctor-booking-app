import React from "react";
import { Calendar, MapPin } from "lucide-react";

export default function AppointmentCard({ appointment }) {
  return (
    <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{appointment.doctorName}</h3>
          <p className="text-blue-600">{appointment.specialty}</p>
        </div>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {appointment.status}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span>{appointment.dateTime}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2" />
          <span>{appointment.location}</span>
        </div>
      </div>
    </div>
  );
}
