import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const { setAToken, backendUrl } = useContext(AdminContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnChange = async (e) => {
    e.preventDefault()

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

      }



    } catch (error) {

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

        <button className='bg-primary items-center w-full p-2 rounded-full text-white'>Login</button>

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