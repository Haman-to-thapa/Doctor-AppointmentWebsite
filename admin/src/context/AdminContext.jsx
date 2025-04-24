import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const AdminContext = createContext()


const AdminContextProvider = (props) => {


  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashboard, setDashboard] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const getAllDoctors = async (docId) => {

    try {

      const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", { docId }, { headers: { Authorization: `Bearer ${aToken}` } })
      console.log(data)

      if (data.success) {
        setDoctors(data.doctors);
        console.log("doctors", data.doctors)
      } else {
        toast.error(error.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailaability = async (docId) => {
    try {
      // const { data } = await axios.post(
      //   backendUrl + '/api/admin/change-availability',
      //   { docId },
      //   { headers: { Authorization: `Bearer ${aToken}` } }
      // );

      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, {
        headers: {
          Authorization: `Bearer ${aToken}` // Correct way to pass token in headers
        }
      })

      if (data.success) {
        toast.success(data.message)
        getAllDoctors()

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  const getAllAppoitments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { Authorization: `Bearer ${aToken}` } })

      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }


  const cancelAppintment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${aToken}` } })

      if (data.success) {
        toast.success(data.message)
        getAllAppoitments()
      } else {
        toast.error(data.message)
      }


    } catch (error) {

      console.log(error)
      toast.error(error.message)
    }

  }


  const getDashData = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { Authorization: `Bearer ${aToken}` } })

      if (data.success) {
        setDashboard(data.dashData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    aToken, setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailaability,
    appointments, setAppointments,
    getAllAppoitments,
    cancelAppintment,
    getDashData,
    dashboard
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;