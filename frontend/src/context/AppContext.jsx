import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext({})

const AppContextProvider = (props) => {
  // State for authentication
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [userData, setUserData] = useState(null);

  // State for doctors data
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for appointments
  const [appointments, setAppointments] = useState([]);

  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  console.log("Using backend URL:", backendUrl);

  // Make sure we're using the correct backend URL in production
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log("Running in production mode with backend URL:", backendUrl);
    }
  }, [backendUrl]);

  // Currency symbol
  const currentSymbol = "$";

  // Helper functions
  const months = [" ", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  const slotDateFormatted = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const calculaterAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  // API functions
  const getDoctorsData = async () => {
    try {
      console.log("Fetching doctors from:", `${backendUrl}/api/doctor/list`);
      setLoading(true);

      // Add a timeout to the axios request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        signal: controller.signal,
        timeout: 10000 // 10 seconds timeout
      });

      clearTimeout(timeoutId);

      console.log("Doctors data received:", data);
      if (data && data.success) {
        setDoctors(data.doctors || []);
        console.log("Doctors set in state:", data.doctors);
        return data.doctors;
      } else {
        console.error("API returned error:", data?.message || "Unknown error");
        toast.error(data?.message || "Failed to fetch doctors");
        return [];
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);

      // Check if it's a network error
      if (error.message === "Network Error" || error.code === "ECONNABORTED") {
        console.error("Network error or timeout. Using static data instead.");
        toast.error("Could not connect to the server. Using local data instead.");
      } else {
        toast.error(error.message || "Something went wrong");
      }

      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserProfile = async () => {
    if (!token) {
      console.log("No token available, skipping profile fetch");
      return;
    }

    try {
      console.log("Fetching user profile with token:", token.substring(0, 10) + "...");
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Profile API response:", data);
      if (data.success) {
        setUserData(data.user);
        console.log("User data set in state");
      } else {
        console.error("Failed to fetch profile:", data.message);
        toast.error(data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // If we get a 401 error, the token might be invalid
      if (error.response && error.response.status === 401) {
        console.log("Token invalid or expired, clearing token");
        setToken("");
        localStorage.removeItem('token');
        toast.error("Your session has expired. Please login again.");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  }

  const getUserAppointments = async () => {
    if (!token) {
      console.log("No token available, skipping appointments fetch");
      return;
    }

    try {
      console.log("Fetching user appointments with token:", token.substring(0, 10) + "...");
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Appointments API response:", data);
      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments set in state");
      } else {
        console.error("Failed to fetch appointments:", data.message);
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // If we get a 401 error, the token might be invalid
      if (error.response && error.response.status === 401) {
        console.log("Token invalid or expired, clearing token");
        setToken("");
        localStorage.removeItem('token');
        toast.error("Your session has expired. Please login again.");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  }

  // Load doctors data when component mounts
  useEffect(() => {
    console.log('AppContext mounted, fetching doctors data');
    // Use a timeout to ensure the component is fully mounted
    const timer = setTimeout(() => {
      getDoctorsData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Load user data when token changes
  useEffect(() => {
    if (token) {
      getUserProfile();
      getUserAppointments();
    }
  }, [token]);

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      setUserData(null);
      setAppointments([]);
    }
  }, [token]);

  const value = {
    token, setToken,
    userData, setUserData,
    doctors, setDoctors,
    loading,
    appointments, setAppointments,
    backendUrl,
    currentSymbol,
    slotDateFormatted,
    calculaterAge,
    getDoctorsData,
    getUserProfile,
    getUserAppointments
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;