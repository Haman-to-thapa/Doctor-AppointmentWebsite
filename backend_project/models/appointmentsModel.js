
import mongoose from "mongoose";


const appointmentsSchema = mongoose.Schema({
  userId: {type:String, required:true},
  docId: {type:String, required:true},
  slotDate: {type:String, required:true},
  slotTime: {type:String, required:true},
  userData: {type:Object, required:true},
  docData: {type:Object, required:true},
  amount:{type:Number, required:true},
  date:{type:Number, required:true},
  cancelled:{type:Boolean, required:false, default:false},
  payment:{type:Boolean, required:false, default:false},
  isCompleted: {type:Boolean, required:false, default:false }

})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentsSchema)

export default appointmentModel;
