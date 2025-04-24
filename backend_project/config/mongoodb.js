// import mongoose from "mongoose"



// const connectDB = async () => {

//   mongoose.connection.on('connected', () => console.log('mongose connected'))
//   mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)


// }

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL;  // Use MONGODB_URL here
    if (!mongoURI) {
      throw new Error("MongoDB URL is missing in environment variables.");
    }
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("🚀 MongoDB Connected");
  } catch (error) {
    console.error("🔥 MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
