import React from "react";
import { useAppointmentStore } from "../stroe/useAppointmentStore";

export default function Taps() {
  const { appointments, activeTab, setActiveTab } = useAppointmentStore();
  return (
    <div className="flex mb-6 border-b border-gray-200">
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === "doctors"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("doctors")}
        aria-selected={activeTab === "doctors"}
        role="tab"
      >
        Doctor Directory
      </button>
      <button
        className={`py-2 px-4 font-medium ${
          activeTab === "appointments"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("appointments")}
        aria-selected={activeTab === "appointments"}
        role="tab"
      >
        My Appointments{" "}
        {appointments?.length > 0 && (
          <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {appointments?.length}
          </span>
        )}
      </button>
    </div>
  );
}
