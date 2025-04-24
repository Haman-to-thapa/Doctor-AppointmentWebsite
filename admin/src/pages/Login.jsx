import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const { setAToken, backendUrl } = useContext(AdminContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);

  const handleOnChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "Admin") {
        console.log("Attempting admin login with email:", email);
        console.log("Using backend URL:", backendUrl);

        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password },
          { timeout: 10000 } // 10 second timeout
        );

        console.log("Login response:", data);

        if (data && data.success) {
          toast.success("Login successful!");
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          console.error("Login failed:", data?.message || "Unknown error");
          toast.error(data?.message || "Login failed. Please check your credentials.");
        }
      } else if (state === "Doctor") {
        toast.info("Doctor login is not implemented yet.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        toast.error(error.response.data?.message || "Login failed. Please check your credentials.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        toast.error(error.message || "An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleOnChange}
      className=" min-h-[80vh] flex items-center">
      <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[$5E5ESE] text-sm shadow-lg'>
        <p> Eamil : admin@prescripto.com <br /> Password : qwerty123
        </p>
        <p className='text-2xl semi-bold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password" required
            className='border border-[#DADADA] rounded w-full p-2 mt-1' />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-primary items-center w-full p-2 rounded-full text-white flex justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {
          state === "Admin"
            ? <p>Doctor Login?
              <span
                onClick={() => setState("Doctor")}
                className='text-primary underline cursor-pointer'
              >Click here</span></p>


            : <p>Admin Login?
              <span
                onClick={() => setState("Admin")}
                className='text-primary cursor-pointer underline'
              >Click here</span></p>
        }

      </div>
    </form>
  )
}

export default Login