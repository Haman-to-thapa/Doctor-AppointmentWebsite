import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentCanceled, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

import { changeAvailable } from '../controllers/doctorController.js'



const adminRouter = express.Router()


adminRouter.post('/add-doctor',upload.single('image'),
addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',allDoctors)
adminRouter.post('/change-availability',changeAvailable)
adminRouter.get('/appointments',appointmentsAdmin)
adminRouter.post('/cancel-appointment',appointmentCanceled)
adminRouter.get('/dashboard',adminDashboard)


export default adminRouter;