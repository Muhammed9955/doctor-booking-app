import React from "react";
import { specialties } from "../utils/constants";
import { Clock, Filter } from "lucide-react";
import DoctorCard from "./DoctorCard";
import Dropdown from "./dropdown";
import { useAppointmentStore } from "../stroe/useAppointmentStore";

export default function DoctorDirectoryView() {
  const { filters, handleBookAppointment, getFilteredDoctors, updateFilter } =
    useAppointmentStore();

  // Get filtered doctors list
  const filteredDoctors = getFilteredDoctors();

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-500" />
          <label htmlFor="specialty-filter" className="mr-2 text-gray-600">
            Specialty:
          </label>
          <select
            id="specialty-filter"
            className="border rounded py-1 px-2"
            value={filters.specialty}
            onChange={(e) => updateFilter("specialty", e.target.value)}
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <Clock size={18} className="mr-2 text-gray-500" />
          <label htmlFor="availability-filter" className="mr-2 text-gray-600">
            Availability:
          </label>
          <select
            id="availability-filter"
            className="border rounded py-1 px-2"
            value={filters.availability}
            onChange={(e) => updateFilter("availability", e.target.value)}
          >
            <option value="All">All</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No doctors found matching your filters.
          </p>
        </div>
      )}
    </>
  );
}
