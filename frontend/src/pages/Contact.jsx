import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl text-gray-500'>
        <p>CONTACT <span className='font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img src={assets.contact_image} className="w-full md:max-w-[360px]" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg'>OUR OFFICE</p>
          <p className=''>54709 Willms Station <br /> suite 350, Washington, USA</p>
          <p className=''>Tel: (415) 555-0132 <br /> Email: greatstackdev@gamil.com</p>
          <p className='font-semibold text-lg'>Careers at PRESCRIPTO</p>
          <p className=''>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact