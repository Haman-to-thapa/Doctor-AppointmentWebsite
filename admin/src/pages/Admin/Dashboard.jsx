import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, cancelAppintment, getDashData, dashboard } = useContext(AdminContext)

  const { slotDateFormted } = useContext(AppContext)


  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])
  return dashboard && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-125 transition-all'>
          <img src={assets.doctor_icon} alt="" className='w-14' />
          <div>
            <p>{dashboard.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>

        <div className='flex itme-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-125 transition-all'>
          <div>
            <img src={assets.appointment_icon} alt="" className='w-14' />
            <p>{dashboard.appoinments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-125 transition-all'>
          <div>
            <img src={assets.patients_icon} alt="" className='w-14' />
            <p>{dashboard.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 border '>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>

        <div>
          {
            dashboard.latestAppointments.map((item, index) => (
              <div key={index}
                className='flex items-center gap-3 py-3 px-6 hover:bg-gray-100'
              >
                <img src={item.docData.image} alt="" className='rounded-full w-10' />
                <div className='flex-1'>
                  <p >{item.docData.name}</p>
                  <p>{slotDateFormted(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ?
                    <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                    : <img
                      className='w-10 cursor-pointer'
                      onClick={() => cancelAppintment(item._id)}
                      src={assets.cancel_icon} alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default Dashboard