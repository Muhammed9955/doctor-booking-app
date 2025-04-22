import React from "react";
import { Clock, MapPin, Star } from "lucide-react";

export default function DoctorCard({ doctor, onBookAppointment }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start">
          <img
            src={doctor.imageUrl}
            alt={`Dr. ${doctor.name}`}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-blue-600">{doctor.specialty}</p>

            <div className="flex items-center mt-1">
              <Star size={16} className="text-yellow-400" />
              <span className="ml-1 text-gray-700">{doctor.rating}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>Available: {doctor.availability}</span>
          </div>
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          onClick={() => onBookAppointment(doctor)}
          aria-label={`Book appointment with ${doctor.name}`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}