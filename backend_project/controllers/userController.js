
import validator from 'validator';  //
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentsModel.js';
import razorpay from 'razorpay'


const registerUser = async (req, res) => {
  const {name, email, password} = req.body
    try {
           if (!name || !email || !password) {
        return res.json({success:false, message:"Missing Details"})
      }


      if (!email || !validator.isEmail(email.trim())) {
        return res.json({ success: false, message: "Invalid email" });
    }
         //  Step 3: Check if email already exists

         const existingUser = await userModel.findOne({ email });
         if (existingUser) {
             return res.json({ success: false, message: "Email already registered. Please log in." });
         }



      if (password.length < 8) {
        return res.json({success:false, message:"Enter a 10 digit password"})
     }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password,salt)


      const userData = {
        name,
        email,
        password:hashPassword
     }

      const newUser = new userModel(userData)
      const user = await newUser.save();
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

      res.json({success:true, token})
    } catch (error) {

      console.log(error)
      res.json({success:false, message:error.message})
  }
}
// API for userlogin
  const loginUser = async (req, res) => {
    try {
      const {email, password} = req.body

      const user = await userModel.findOne({email})
      if(!user) {
      return res.json({ success: false, message: "user does not exist" });
     }
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        //  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
         res.json({success:true, token})
      } else {
       res.json({success:false, message:"invalide credentaialing"});
     }
    } catch (error) {
      console.log(error)
     res.json({success:false, message:error.messag})    }
  }
  // API to get user Profile data
  const getProfile = async (req, res) => {
    try {
      // Assuming you're fetching user profile using the authenticated user ID
      if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized. User ID not found." });
     }
      const user = await userModel.findById(req.user.id).select('-password -__v -tokens');

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
     }

      res.status(200).json({ success: true, user });

    } catch (error) {
      console.error(" Error fetching profile:", error);
      res.status(500).json({ success: false, message: error.message });    }
  };
  // API to update user profile

  const updateProfile = async (req, res) => {
    try {
        const {userId, name , phone , address, dob, gender} = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
          return res.json({success:false, message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})

        if (imageFile) {
          // upload image to cloudinary
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
          const imageURL = imageUpload.secure_url

          await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true, message:"profile Update"})

    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
  }

// API to book an appointment
const bookAppointment = async (req, res) => {
  try {
    console.log("Booking appointment, req.user:", req.user);

    // Get userId from the token (req.user) instead of req.body
    if (!req.user || !req.user.id) {
      console.log("User ID not found in token");
      return res.status(401).json({ success: false, message: "User ID not found in token" });
    }

    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;

    console.log("Booking appointment for user:", userId);
    console.log("Appointment details:", { docId, slotDate, slotTime });

    // Get doctor data
    const doctorData = await doctorModel.findById(docId).select('-password');
    if (!doctorData) {
      console.log("Doctor not found:", docId);
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!doctorData.available) {
      console.log("Doctor not available:", docId);
      return res.status(400).json({ success: false, message: "Doctor not available" });
    }

    // Get user data
    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      console.log("User not found:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User found:", userData.name);

    // Check slot availability
    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    // Add slot to booked slots
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    // Create appointment data
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData: doctorData,
      amount: doctorData.fees,
      date: Date.now(),
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


   // API to get user appointments for frontend my-appointment page

   const listAppointment = async (req, res) => {
    try {
      // Get userId from the token (req.user) instead of req.body
      const userId = req.user.id;

      if (!userId) {
        return res.json({ success: false, message: "User ID not found in token" });
      }

      const appointments = await appointmentModel.find({userId})

      res.json({success:true, appointments})


    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
   }


// API to cancel Appointments
const cancelAppointment = async (req, res) => {
  try {
    // Get userId from the token (req.user) instead of req.body
    const userId = req.user.id;
    const { appointmentId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID not found in token" });
    }

    // Find appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Not authorized to cancel this appointment" });
    }

    // Mark appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({ success: true, message: "Appointment cancelled but doctor data not found" });
    }

    let slots_booked = doctorData.slots_booked;

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to make payments for appointment using razorPay
const paymentRazorpay = async (req, res) => {
  try {
    // Get userId from the token (req.user) instead of req.body
    const userId = req.user.id;
    const { appointmentId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID not found in token" });
    }

    // Find appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled or not found" });
    }

    // Initialize Razorpay instance
    const razorpayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Creating options for razorpay payment
    const option = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY || 'INR',
      receipt: appointmentId,
    };

    // Create an order
    const order = await razorpayInstance.orders.create(option);

    res.json({ success: true, order });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to verify payment of razorPay

const varifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, appointmentId } = req.body;

    // Initialize Razorpay instance if not already done
    const razorpayInstance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Fetch order details from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);

    if (orderInfo.status === 'paid') {
      // Update appointment payment status
      await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, varifyRazorpay};
