import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors as staticDoctors } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors, loading, getDoctorsData } = useContext(AppContext)

  // Filter doctors based on speciality
  const filterApply = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  // Fetch doctors if not already loaded
  useEffect(() => {
    if (doctors.length === 0) {
      getDoctorsData()
    }
  }, [])

  // Apply filter when doctors or speciality changes
  useEffect(() => {
    filterApply()
  }, [speciality, doctors])

  return (
    <div>
      <p className='text-gray-600'>Browse though the doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-green-700 text-white ' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>


          <p onClick={() => speciality === "Gynecologist" ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>


          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>


          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>

          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>

          <p onClick={() => speciality === "Gastroenterologist" ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full gird gap-4 pt-5 gap-y-6 px-3 sm:px-0 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] '>
          {loading ? (
            <div className="col-span-full text-center py-10">
              <p>Loading doctors...</p>
            </div>
          ) : filterDoc.length === 0 ? (
            speciality ? (
              // Filter static doctors by speciality as fallback
              staticDoctors.filter(doc => doc.speciality === speciality).map((item, index) => (
                <div key={index}
                  onClick={() => navigate(`/appointment/${item._id}`
                  )}
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
              <div className="col-span-full text-center py-10">
                <p>No doctors available for this speciality.</p>
              </div>
            )
          ) : (
            filterDoc.map((item, index) => (
              <div key={index}
                onClick={() => navigate(`/appointment/${item._id}`

                )}
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
      </div>
    </div >
  )
}

export default Doctors