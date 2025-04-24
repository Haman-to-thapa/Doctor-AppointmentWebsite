import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailaability } = useContext(AdminContext)


  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }

  }, [aToken])

  return <div>
    <h1 className="text-2xl text-center pt-6  font-semibold ">All Doctors</h1>
    <div className="grid sm:grid-cols-4 w-full gap-4 pt-5 gap-y-7 " >
      {
        doctors.map((item, index) => (
          <div key={index} className="border boder-indigo rounded-xl max-w-56 overflow-hidden cursor-pointer 
          group
          ">
            <img src={item.image} className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" />
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium  group-hover:text-blue-500">{item.name}</p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input onChange={() => changeAvailaability(item._id)} type="checkbox" checked={item.available
                } />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>;
};

export default DoctorList;