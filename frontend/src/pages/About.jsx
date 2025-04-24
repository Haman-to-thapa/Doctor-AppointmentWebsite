import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className=' text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={assets.about_image} className="w-full md:max-w-[360px] " />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm font-normal'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quas recusandae saepe soluta, libero laborum non placeat, quod animi repellendus assumenda. Molestiae tenetur molestias dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis qui commodi quo veritatis quaerat eaque reprehenderit repellendus praesentium fugiat. Quod fuga deleniti consectetur quidem alias sequi distinctio nemo inventore provident.</p>
          <p>orem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eligendi minus illum. Quae quis commodi accusamus quas. Voluptatibus, praesentium qui? Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores illo obcaecati vel sequi laboriosam, quo architecto nemo recusandae commodi distinctio modi illum possimus, odio, quaerat ea error labore sit fugit.</p>
          <b>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, velit saepe consequatur beatae molestiae et est eveniet distinctio dolorum sint! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores officia saepe, consequuntur pariatur expedita provident. Adipisci fugit porro illum sed! Quo debitis voluptatem suscipit vitae fugiat voluptatum! Culpa, distinctio minus!</p>
        </div>
      </div>

      <div className='text-xl my-4' >
        <p>WHY<span className='font-semibold text-black'> CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fitts into your busy lifesStyle.</p>
        </div>

        <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-blue hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Converience:</b>
          <p>Axxess to a network of trusted heathcare profesioanlas in your area. </p>
        </div>

        <div className='border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommondations and remimdeers to help you stay on top of your health. </p>
        </div>
      </div>
    </div>
  )
}

export default About