import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

// This component automatically redirects to the dashboard
const LoginRedirect = () => {
  const navigate = useNavigate();
  const { setAToken } = useContext(AdminContext);

  useEffect(() => {
    console.log("Login component mounted - redirecting to dashboard");
    
    // Set a permanent admin token
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBwcmVzY3JpcHRvLmNvbSIsImlhdCI6MTYxNjE2MjIyMiwiZXhwIjo5OTk5OTk5OTk5fQ.3NR0cDyxx8wM7NTQgrVWE7GR4Nwhh1XEpIdQwMgSjCc";
    localStorage.setItem('aToken', mockToken);
    setAToken(mockToken);
    
    // Show notification
    toast.info("Admin panel is in open access mode - no login required", {
      position: "top-center",
      autoClose: 3000
    });
    
    // Redirect to dashboard
    navigate('/admin-dashboard', { replace: true });
  }, []);

  // Return a message in case the redirect doesn't happen immediately
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center p-8 border rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Redirecting to Admin Dashboard...</h2>
        <p className="mb-4">You are being automatically redirected to the admin dashboard.</p>
        <p>If you are not redirected, <a href="/admin-dashboard" className="text-blue-500 underline">click here</a>.</p>
      </div>
    </div>
  );
}

export default LoginRedirect
