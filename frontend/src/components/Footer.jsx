import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-40 text-sm'>
        {/* ======letf section ======= */}
        <div>
          <img src={assets.logo} alt="" className='mb-5 w-40' />
          <p className='w-full md:w-2/3 text-gray- leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, exercitationem placeat? Sed laudantium nobis omnis delectus dolorem facilis ipsum aperiam provident nihil accusamus! Officiis fuga corrupti minima temporibus, dicta exercitationem.</p>
        </div>
        {/* -======center section ====== */}
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li> Privacy Policy</li>
          </ul>
        </div>
        {/* ======right section======= */}
        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gamil.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* =============CopyRight TExt=========== */}
        <div>
          <hr className='bg-black' />
          <p className='py-5 text-sm text-center'>CopyRight 2025@ Prescripto - All Right Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer