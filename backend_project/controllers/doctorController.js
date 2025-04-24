import doctorModel from "../models/doctorModel.js"




const changeAvailable = async(req, res) => {

  try {


    const {docId} = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
    res.json({success:true, message: "availability changed"})


  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }

}

const doctorList = async (req,res) => {
  try {
    console.log("Fetching doctor list...");
    const doctors = await doctorModel.find({}).select(['-password', '-email']);
    console.log(`Found ${doctors.length} doctors`);

    // Return the doctors with a 200 status code
    return res.status(200).json({
      success: true,
      doctors,
      count: doctors.length
    });

  } catch (error) {
    console.error("Error in doctorList:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching doctors"
    });
  }
}
  // API for doctor Login



export {changeAvailable, doctorList};