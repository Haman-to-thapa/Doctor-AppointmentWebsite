import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react';

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

const App = () => {
  const { setAToken } = useContext(AdminContext)

  // Set a mock token on component mount to bypass authentication
  useEffect(() => {
    // Create a permanent admin token that never expires
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBwcmVzY3JpcHRvLmNvbSIsImlhdCI6MTYxNjE2MjIyMiwiZXhwIjo5OTk5OTk5OTk5fQ.3NR0cDyxx8wM7NTQgrVWE7GR4Nwhh1XEpIdQwMgSjCc";
    localStorage.setItem('aToken', mockToken);
    setAToken(mockToken);

    // Show a notification that authentication is bypassed
    toast.info("Admin panel is in open access mode - no login required", {
      position: "top-center",
      autoClose: 3000
    });
  }, []);

  return (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />

        <Routes>
          <Route path='/' element={<Navigate to="/admin-dashboard" replace />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />
        </Routes>

      </div>
    </div>
  )
}

export default App