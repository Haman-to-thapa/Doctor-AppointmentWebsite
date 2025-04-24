import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* ------ left sdie ------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center m-auto gap-4 py-10 md:py-[10vw] md:mb-[-30px]'>

        <p className='text-3xl md:tex-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight text-white'> Book Appointment <br />
          With Trusted Doctors</p>
        <div className=' flex flex-col md:flex-row items-center gap-3 text-white font-medium text-sm'>
          <img src={assets.group_profiles} alt="" className='w-28' />
          <p>Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.</p>
        </div>
        <a className='flex gap-2 text-lg border p-2 rounded-full bg-white hover:scale-105 duration-300 md:m-0 transition-all font-medium' href='#speciality'>Book appointment
          <img src={assets.arrow_icon} alt="" className='w-3' />
        </a>
      </div>

      {/* ------- right side --------  */}
      <div className='md:w-1/2 relative '>
        <img src={assets.header_img} alt="" className='w-full bottom-0 h-auto rounded-lg' />
      </div>

    </div>
  )
}

export default Header