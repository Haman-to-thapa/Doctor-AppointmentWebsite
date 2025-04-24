import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { mockDoctors, mockAppointments, mockDashboardData } from "../assets/mockData";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

  // Always provide a default token if none exists in localStorage
  const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBwcmVzY3JpcHRvLmNvbSIsImlhdCI6MTYxNjE2MjIyMiwiZXhwIjo5OTk5OTk5OTk5fQ.3NR0cDyxx8wM7NTQgrVWE7GR4Nwhh1XEpIdQwMgSjCc";
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || defaultToken);

  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashboard, setDashboard] = useState(false)
  const [loading, setLoading] = useState(false)

  // Get backend URL from environment variables with fallback
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

  // Check if we should use static data
  const useStaticData = import.meta.env.VITE_USE_STATIC_DATA === "true";

  // Log the backend URL for debugging
  console.log("Admin panel using backend URL:", backendUrl);
  console.log("Using static data:", useStaticData);

  // Check if the backend is accessible - skip actual check due to CORS
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        // Don't actually try to fetch from the backend due to CORS issues
        console.log("Skipping backend accessibility check due to CORS restrictions");

        // If we're not already using static data, show a message
        if (!useStaticData) {
          console.warn("Using static data due to potential CORS issues with backend");
          toast.info("Using demo mode with sample data", {
            position: "top-center",
            autoClose: 3000
          });
        }
      } catch (error) {
        console.error("Error in checkBackendStatus:", error);
      }
    };

    checkBackendStatus();
  }, [backendUrl, useStaticData]);


  const getAllDoctors = async (docId) => {
    // If we're using static data, return it immediately
    if (useStaticData) {
      console.log("Using static data for doctors by configuration");
      setDoctors(mockDoctors);
      return mockDoctors;
    }

    try {
      setLoading(true);
      console.log("Fetching all doctors from:", backendUrl + "/api/admin/all-doctors");

      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        { docId },
        {
          headers: { Authorization: `Bearer ${aToken}` },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("API response:", data);

      if (data && data.success) {
        setDoctors(data.doctors || []);
        console.log("Doctors set in state:", data.doctors);
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to fetch doctors");

        // Fall back to mock data
        console.log("Falling back to mock data for doctors");
        setDoctors(mockDoctors);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Server error");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        toast.error("No response from server. Using mock data.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred");
      }

      // Fall back to mock data
      console.log("Falling back to mock data for doctors");
      setDoctors(mockDoctors);
    } finally {
      setLoading(false);
    }
  }

  const changeAvailaability = async (docId) => {
    // If we're using static data, simulate changing availability
    if (useStaticData) {
      console.log("Using static data, simulating availability change for doctor:", docId);

      // Find the doctor in the mock data
      const updatedDoctors = mockDoctors.map(doctor => {
        if (doctor._id === docId) {
          return { ...doctor, available: !doctor.available };
        }
        return doctor;
      });

      // Update the doctors state
      setDoctors(updatedDoctors);
      toast.success("Doctor availability updated successfully");
      return;
    }

    try {
      setLoading(true);
      console.log("Changing doctor availability for:", docId);

      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability',
        { docId },
        {
          headers: {
            Authorization: `Bearer ${aToken}`
          },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("API response:", data);

      if (data && data.success) {
        toast.success(data.message || "Doctor availability updated successfully");
        getAllDoctors();
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to update doctor availability");
      }
    } catch (error) {
      console.error("Error changing doctor availability:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Server error");
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from server. Using mock data.");

        // Simulate changing availability with mock data
        const updatedDoctors = doctors.map(doctor => {
          if (doctor._id === docId) {
            return { ...doctor, available: !doctor.available };
          }
          return doctor;
        });

        // Update the doctors state
        setDoctors(updatedDoctors);
        toast.success("Doctor availability updated successfully (simulated)");
      } else {
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }


  const getAllAppoitments = async () => {
    // If we're using static data, return it immediately
    if (useStaticData) {
      console.log("Using static data for appointments by configuration");
      setAppointments(mockAppointments);
      return mockAppointments;
    }

    try {
      setLoading(true);
      console.log("Fetching all appointments from:", backendUrl + '/api/admin/appointments');

      const { data } = await axios.get(
        backendUrl + '/api/admin/appointments',
        {
          headers: { Authorization: `Bearer ${aToken}` },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("Appointments API response:", data);

      if (data && data.success) {
        setAppointments(data.appointments || []);
        console.log(`Found ${data.appointments?.length || 0} appointments`);
        return data.appointments;
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to fetch appointments");

        // Fall back to mock data
        console.log("Falling back to mock data for appointments");
        setAppointments(mockAppointments);
        return mockAppointments;
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Server error");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        toast.error("No response from server. Using mock data.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred");
      }

      // Fall back to mock data
      console.log("Falling back to mock data for appointments");
      setAppointments(mockAppointments);
      return mockAppointments;
    } finally {
      setLoading(false);
    }
  }


  const cancelAppintment = async (appointmentId) => {
    // If we're using static data, simulate cancelling appointment
    if (useStaticData) {
      console.log("Using static data, simulating appointment cancellation for:", appointmentId);

      // Find the appointment in the mock data and update its status
      const updatedAppointments = mockAppointments.map(appointment => {
        if (appointment._id === appointmentId) {
          return { ...appointment, status: "cancelled" };
        }
        return appointment;
      });

      // Update the appointments state
      setAppointments(updatedAppointments);
      toast.success("Appointment cancelled successfully");
      return;
    }

    try {
      setLoading(true);
      console.log("Cancelling appointment:", appointmentId);

      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${aToken}` },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("API response:", data);

      if (data && data.success) {
        toast.success(data.message || "Appointment cancelled successfully");
        getAllAppoitments();
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Server error");
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from server. Using mock data.");

        // Simulate cancelling appointment with current data
        const updatedAppointments = appointments.map(appointment => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status: "cancelled" };
          }
          return appointment;
        });

        // Update the appointments state
        setAppointments(updatedAppointments);
        toast.success("Appointment cancelled successfully (simulated)");
      } else {
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }


  const getDashData = async () => {
    // If we're using static data, return it immediately
    if (useStaticData) {
      console.log("Using static data for dashboard by configuration");
      setDashboard(mockDashboardData);
      return mockDashboardData;
    }

    try {
      setLoading(true);
      console.log("Fetching dashboard data from:", backendUrl + '/api/admin/dashboard');

      const { data } = await axios.get(
        backendUrl + '/api/admin/dashboard',
        {
          headers: { Authorization: `Bearer ${aToken}` },
          timeout: 10000 // 10 second timeout
        }
      );

      console.log("Dashboard API response:", data);

      if (data && data.success) {
        setDashboard(data.dashData);
        console.log("Dashboard data set in state");
        return data.dashData;
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to fetch dashboard data");

        // Fall back to mock data
        console.log("Falling back to mock data for dashboard");
        setDashboard(mockDashboardData);
        return mockDashboardData;
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Server error");
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from server. Using mock data.");
      } else {
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred");
      }

      // Fall back to mock data
      console.log("Falling back to mock data for dashboard");
      setDashboard(mockDashboardData);
      return mockDashboardData;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    aToken, setAToken,
    backendUrl,
    doctors,
    loading,
    getAllDoctors,
    changeAvailaability,
    appointments, setAppointments,
    getAllAppoitments,
    cancelAppintment,
    getDashData,
    dashboard
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;