import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { token, setToken, backendUrl } = useContext(AppContext);

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center">
      <div className='flex flex-col items-start gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 rounded-lg border text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? 'Create Account' : "Login"}</p>
        <p>{state === "Sign Up" ? "sign up" : "log in"}  Please  to book  appointment</p>

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name</p>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} required className='border border-zinc-300 rounded w-full p-2 mt-1' />
          </div>
        }


        <div className='w-full'>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required className='p-2 mt-1 w-full border border-zinc-300 ' />
        </div>

        <div className='w-full'>
          <h3>Password</h3>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className='p-2 w-full pt-1 border border-zinc-300' />
        </div>
        <button
          type='submit'
          className='bg-primary w-full p-2 rounded-full text-white text-base'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ?
            <p> Already hava an account? <span onClick={() => setState("Login")} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p> Create an new account? <span onClick={() => setState("Sign Up")} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>

    </form>
  )
}

export default Login