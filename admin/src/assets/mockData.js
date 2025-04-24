// Mock data for the admin panel when the backend is down

export const mockDoctors = [
  {
    _id: "mock-doctor-1",
    name: "Dr. John Smith",
    speciality: "Cardiologist",
    experience: 10,
    fees: 500,
    available: true,
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-20T10:00:00.000Z"
  },
  {
    _id: "mock-doctor-2",
    name: "Dr. Sarah Johnson",
    speciality: "Neurologist",
    experience: 8,
    fees: 450,
    available: true,
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-21T10:00:00.000Z"
  },
  {
    _id: "mock-doctor-3",
    name: "Dr. Michael Brown",
    speciality: "Pediatrician",
    experience: 12,
    fees: 400,
    available: false,
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-22T10:00:00.000Z"
  },
  {
    _id: "mock-doctor-4",
    name: "Dr. Emily Davis",
    speciality: "Dermatologist",
    experience: 6,
    fees: 350,
    available: true,
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-23T10:00:00.000Z"
  },
  {
    _id: "mock-doctor-5",
    name: "Dr. Robert Wilson",
    speciality: "Orthopedic",
    experience: 15,
    fees: 550,
    available: true,
    image: "https://via.placeholder.com/150",
    createdAt: "2023-04-24T10:00:00.000Z"
  }
];

export const mockAppointments = [
  {
    _id: "mock-appointment-1",
    doctorId: "mock-doctor-1",
    doctorName: "Dr. John Smith",
    doctorImage: "https://via.placeholder.com/150",
    userId: "mock-user-1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userPhone: "1234567890",
    slotDate: "25_4_2023",
    slotTime: "10:00 AM",
    status: "confirmed",
    createdAt: "2023-04-20T10:00:00.000Z"
  },
  {
    _id: "mock-appointment-2",
    doctorId: "mock-doctor-2",
    doctorName: "Dr. Sarah Johnson",
    doctorImage: "https://via.placeholder.com/150",
    userId: "mock-user-2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    userPhone: "0987654321",
    slotDate: "26_4_2023",
    slotTime: "2:00 PM",
    status: "confirmed",
    createdAt: "2023-04-21T10:00:00.000Z"
  },
  {
    _id: "mock-appointment-3",
    doctorId: "mock-doctor-3",
    doctorName: "Dr. Michael Brown",
    doctorImage: "https://via.placeholder.com/150",
    userId: "mock-user-3",
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    userPhone: "5678901234",
    slotDate: "27_4_2023",
    slotTime: "4:00 PM",
    status: "cancelled",
    createdAt: "2023-04-22T10:00:00.000Z"
  },
  {
    _id: "mock-appointment-4",
    doctorId: "mock-doctor-4",
    doctorName: "Dr. Emily Davis",
    doctorImage: "https://via.placeholder.com/150",
    userId: "mock-user-4",
    userName: "Sarah Williams",
    userEmail: "sarah.williams@example.com",
    userPhone: "3456789012",
    slotDate: "28_4_2023",
    slotTime: "11:00 AM",
    status: "confirmed",
    createdAt: "2023-04-23T10:00:00.000Z"
  },
  {
    _id: "mock-appointment-5",
    doctorId: "mock-doctor-5",
    doctorName: "Dr. Robert Wilson",
    doctorImage: "https://via.placeholder.com/150",
    userId: "mock-user-5",
    userName: "Michael Davis",
    userEmail: "michael.davis@example.com",
    userPhone: "6789012345",
    slotDate: "29_4_2023",
    slotTime: "3:00 PM",
    status: "confirmed",
    createdAt: "2023-04-24T10:00:00.000Z"
  }
];

// Create mock docData for each appointment
const mockAppointmentsWithDocData = mockAppointments.map(appointment => {
  // Find the doctor for this appointment
  const doctor = mockDoctors.find(doc => doc._id === appointment.doctorId);

  return {
    ...appointment,
    docData: {
      _id: doctor?._id || "mock-doctor-1",
      name: doctor?.name || "Dr. John Smith",
      image: doctor?.image || "https://via.placeholder.com/150"
    },
    cancelled: appointment.status === "cancelled"
  };
});

export const mockDashboardData = {
  doctors: mockDoctors.length,
  appoinments: mockAppointments.length,
  patients: 10,
  latestAppointments: mockAppointmentsWithDocData.slice(0, 3)
};
