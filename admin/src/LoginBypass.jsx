import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import { toast } from 'react-toastify';

// This component will automatically bypass the login page
const LoginBypass = () => {
  const { setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Create a permanent admin token that never expires
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLWlkIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBwcmVzY3JpcHRvLmNvbSIsImlhdCI6MTYxNjE2MjIyMiwiZXhwIjo5OTk5OTk5OTk5fQ.3NR0cDyxx8wM7NTQgrVWE7GR4Nwhh1XEpIdQwMgSjCc";
    
    // Set the token in localStorage and context
    localStorage.setItem('aToken', mockToken);
    setAToken(mockToken);
    
    // Show a notification
    toast.info("Admin panel is in open access mode - no login required", {
      position: "top-center",
      autoClose: 3000
    });
    
    // Redirect to the dashboard
    navigate('/admin-dashboard');
  }, []);

  return null; // This component doesn't render anything
};

export default LoginBypass;
