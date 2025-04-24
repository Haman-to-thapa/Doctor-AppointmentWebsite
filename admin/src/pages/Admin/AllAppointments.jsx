import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { aToken, appointments, getAllAppoitments, cancelAppintment } = useContext(AdminContext)
  const { calculaterAge, slotDateFormted, currency } = useContext(AppContext)

  // Fetch appointments when component mounts or token changes
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!aToken) return

      try {
        setLoading(true)
        setError(null)
        await getAllAppoitments()
      } catch (err) {
        setError('Failed to load appointments')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [aToken])

  // Function to handle refresh
  const handleRefresh = async () => {
    try {
      setLoading(true)
      setError(null)
      await getAllAppoitments()
    } catch (err) {
      setError('Failed to refresh appointments')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='text-xl font-medium'>All Appointments</h1>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-auto min-h-[60vh]'>
        {/* Table Header */}
        <div className='sticky top-0 bg-gray-50 hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : null}

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b hover:bg-gray-100 transition-colors'
          >
            {/* Index Number */}
            <p className='max-sm:hidden flex items-center'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img
                src={item.userData?.image || assets.profile_icon}
                alt="Patient"
                className='w-8 h-8 rounded-full object-cover bg-gray-100'
              />
              <p className="font-medium">{item.userData?.name || 'Unknown Patient'}</p>
            </div>

            {/* Patient Age */}
            <div className='flex items-center'>
              <p>{item.userData?.dob ? calculaterAge(item.userData.dob) : 'N/A'}</p>
            </div>

            {/* Appointment Date & Time */}
            <div className='flex items-center'>
              <p>{item.slotDate ? slotDateFormted(item.slotDate) : 'N/A'}, {item.slotTime || 'N/A'}</p>
            </div>

            {/* Doctor Info */}
            <div className='flex items-center gap-2'>
              <img
                src={item.docData?.image || assets.doctor_icon}
                alt="Doctor"
                className='w-8 h-8 rounded-full object-cover bg-gray-100'
              />
              <p>{item.docData?.name || 'Unknown Doctor'}</p>
            </div>

            {/* Fees */}
            <div className='flex items-center'>
              <p className="font-medium">{currency}{item.amount || 0}</p>
            </div>

            {/* Actions */}
            <div className='flex items-center justify-center'>
              {item.cancelled || item.cnacelled ? (
                <p className='text-red-500 text-sm font-medium'>Cancelled</p>
              ) : (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this appointment?')) {
                      cancelAppintment(item._id);
                    }
                  }}
                  disabled={loading}
                  className="flex items-center justify-center"
                >
                  <img
                    src={assets.cancel_icon}
                    className={`w-8 h-8 cursor-pointer hover:scale-110 transition-transform ${loading ? 'opacity-50' : ''}`}
                    alt="Cancel"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments