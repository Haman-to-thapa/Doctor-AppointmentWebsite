import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from "dotenv";
import connectDB from './config/mongoodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'



// app   config

const app = express()
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()
dotenv.config();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Configure CORS for development and production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
        process.env.FRONTEND_URL || 'https://your-frontend-domain.onrender.com',
        process.env.ADMIN_URL || 'https://your-admin-domain.onrender.com'
      ]
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions))


// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

//localhost:4000;api/admin/add-doctor

app.get('/', (req, res) => {
  const today = new Date().toLocaleDateString();
  res.json({
    message: "welcome to doctor appointment",
    today: today,
    endpoints: {
      doctors: "/api/doctor/list",
      admin: "/api/admin",
      user: "/api/user",
      test: "/test-doctor-list"
    },
    status: "online"
  });
})

// Import doctor model directly
import doctorModel from './models/doctorModel.js';

// Add a test endpoint for doctor list
app.get('/test-doctor-list', async (req, res) => {
  try {
    console.log("Test doctor list endpoint called");
    const doctors = await doctorModel.find({}).select(['-password', '-email']);
    console.log(`Found ${doctors.length} doctors`);

    return res.status(200).json({
      success: true,
      doctors,
      count: doctors.length
    });
  } catch (error) {
    console.error("Error in test-doctor-list:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching doctors"
    });
  }
});

// Add a catch-all route for debugging
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
})

// Add an error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
})


app.listen(port, () => console.log('Server Started', port))

