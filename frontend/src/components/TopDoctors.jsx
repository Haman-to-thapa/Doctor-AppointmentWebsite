import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors as staticDoctors } from '../assets/assets'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors, loading, getDoctorsData } = useContext(AppContext)

  useEffect(() => {
    // If doctors array is empty, fetch the data
    console.log("TopDoctors component mounted, doctors:", doctors);
    if (doctors.length === 0) {
      console.log("Calling getDoctorsData from TopDoctors");
      getDoctorsData();
    }
  }, [])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='text-sm sm:w-1/3'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full gird gap-4 pt-5 gap-y-6 px-3 sm:px-0 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] '>
        {loading ? (
          <div className="col-span-full text-center py-10">
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          // Use static data as fallback
          staticDoctors.slice(0, 10).map((item, index) => (
            <div key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`
                ); scrollTo(0, 0)
              }}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center text-center text-sm gap-2'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p className='text-primary'>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          doctors.slice(0, 10).map((item, index) => (
            <div key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`

                ); scrollTo(0, 0)
              }}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center text-center text-sm gap-2'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p className='text-primary'>{item.available ? 'Available' : 'Unavailable'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>

              </div>
            </div>
          ))
        )}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 '>more</button>
    </div>
  )
}

export default TopDoctors