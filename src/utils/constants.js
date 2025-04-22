// Mock data for doctors
export const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    location: "Downtown Medical Center",
    availability: "Morning",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Pediatrics",
    rating: 4.9,
    location: "Children's Health Clinic",
    availability: "Afternoon",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    rating: 4.7,
    location: "Skin & Wellness Center",
    availability: "Evening",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialty: "Neurology",
    rating: 4.6,
    location: "Neuroscience Institute",
    availability: "Morning",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: 5,
    name: "Dr. David Kim",
    specialty: "Orthopedics",
    rating: 4.9,
    location: "Sports Medicine Center",
    availability: "Afternoon",
    imageUrl: "/api/placeholder/150/150",
  },
  {
    id: 6,
    name: "Dr. Lisa Patel",
    specialty: "Cardiology",
    rating: 4.5,
    location: "Heart Health Clinic",
    availability: "Evening",
    imageUrl: "/api/placeholder/150/150",
  },
];

// Available time slots based on availability
export const timeSlots = {
  Morning: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  Evening: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
};

// Available specialties
export const specialties = [
  "All",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Neurology",
  "Orthopedics",
];
