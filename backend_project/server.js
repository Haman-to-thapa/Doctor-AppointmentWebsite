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
// Configure CORS to allow all origins for simplicity
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if(!origin) return callback(null, true);

    // Allow all origins for now to fix CORS issues
    return callback(null, true);

    /* Uncomment this for more restrictive CORS policy in production
    const allowedOrigins = [
      'https://doctor-appointment-frontend-48je.onrender.com',
      'https://doctor-appointment-website-0kx3.onrender.com',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177'
    ];

    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
    */
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Confirm-Delete'],
  optionsSuccessStatus: 200, // For legacy browser support
  preflightContinue: false,
  maxAge: 86400 // Preflight results are cached for 24 hours
};

app.use(cors(corsOptions))

// Add a specific CORS handler for payment routes to ensure preflight requests are handled correctly
app.options('/api/user/payment-razorpay', cors(corsOptions));
app.options('/api/user/verifyRazorpay', cors(corsOptions));

// Add a middleware to ensure CORS headers are set for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Add a middleware to log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

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

