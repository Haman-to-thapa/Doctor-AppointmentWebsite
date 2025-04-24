import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { token, backendUrl, appointments, getUserAppointments, slotDateFormatted, currentSymbol } = useContext(AppContext)
  const [loading, setLoading] = useState(false)


  // Load appointments when component mounts or token changes
  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message || "Appointment cancelled successfully")
        getUserAppointments() // Refresh appointments list
      } else {
        toast.error(data.message || "Failed to cancel appointment")
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Function to initiate payment
  const initiatePayment = async (appointmentId) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success && data.order) {
        // Initialize Razorpay payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_key", // Use environment variable
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Doctor Appointment",
          description: "Payment for doctor appointment",
          order_id: data.order.id,
          handler: async (response) => {
            try {
              const verifyData = await axios.post(
                `${backendUrl}/api/user/verifyRazorpay`,
                response,
                { headers: { Authorization: `Bearer ${token}` } }
              )

              if (verifyData.data.success) {
                toast.success("Payment successful!")
                getUserAppointments() // Refresh appointments
              }
            } catch (error) {
              console.error("Payment verification error:", error)
              toast.error("Payment verification failed")
            }
          },
          prefill: {
            name: "Patient",
            email: "",
            contact: ""
          },
          theme: {
            color: "#5f6fff"
          }
        }

        // Initialize Razorpay
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        toast.error(data.message || "Failed to initiate payment")
      }
    } catch (error) {
      console.error("Error initiating payment:", error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700'>My Appointments</p>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-10">
          <p>You don't have any appointments yet.</p>
        </div>
      ) : (
        <div>
          {appointments.map((appointment, index) => (
            <div className='gird grid-col-[1fr, 2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img src={appointment.docData?.image} alt="" className='w-32 bg-indigo-100' />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{appointment.docData?.name}</p>
                <p className='text-zinc-700 font-medium mt-1'>{appointment.docData?.speciality}</p>
                <p className='text-zinc-800 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{appointment.docData?.address?.line1}</p>
                <p className='text-xs'>{appointment.docData?.address?.line2}</p>
                <p className='text-sm mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>
                  {slotDateFormatted(appointment.slotDate)} | {appointment.slotTime}
                </p>
                <p className='text-sm mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Amount: </span>
                  {currentSymbol}{appointment.amount}
                </p>
                <p className='text-sm mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Status: </span>
                  <span className={`${appointment.cancelled ? 'text-red-500' : appointment.paid ? 'text-green-500' : 'text-orange-500'}`}>
                    {appointment.cancelled ? 'Cancelled' : appointment.paid ? 'Paid' : 'Payment Pending'}
                  </span>
                </p>
              </div>

              {!appointment.cancelled && (
                <div className='flex flex-col gap-2 justify-end'>
                  {!appointment.paid && (
                    <button
                      onClick={() => initiatePayment(appointment._id)}
                      disabled={loading}
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300'
                    >
                      Pay Online
                    </button>
                  )}
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    disabled={loading}
                    className='py-2 border rounded text-stone-500 text-center sm-w-48 hover:bg-red-500 hover:text-white transition-all duration-300'
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments