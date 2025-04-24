import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken } = useContext(AppContext)

  const Logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img src={assets.logo} onClick={() => navigate('/')} className="w-44 cursor-pointer" />
      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to={"/"}>
          <li className='py-1'>Home</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={"/doctors"}>
          <li className='py-1'>All Doctors</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={'/about'}>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to={"/contact"}>
          <li className='py-1'>Contact</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p className='cursor-pointer hover:text-black ' onClick={() => navigate("/my-profile")}>My Profile</p>
                <p className='cursor-pointer hover:text-black ' onClick={() => navigate('/my-appointments')}>My Appointments</p>
                <p className='cursor-pointer hover:text-black ' onClick={Logout}>Logout</p>
              </div>
            </div>
          </div>
            : <button onClick={() => navigate('/login')} className='text-white bg-primary px-8 py-2 rounded-full font-light hidden md:block'>Create Account</button>
        }
        <img onClick={() => setShowMenu(true)} src={assets.menu_icon} alt='' className='w-6 md:hidden' />
        {/* ----- Mobile Menu ----- */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 buttom-0 z-20 overflow-hidden bg-white transition-all `}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} alt="" className='w-36' />
            <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar