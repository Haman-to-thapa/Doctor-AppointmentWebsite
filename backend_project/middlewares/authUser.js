// import jwt from 'jsonwebtoken'

// // user authentication middleware

// const authUser = async (req, res, next) => {
//   try {

//     const {token} = req.body

//     if (!token) {
//       return res.json({success:false, message: "Not Authorized Login Again"})
//     }
//     const token_docode = jwt.verify(token, process.env.JWT_SECRET)

//     req.body.userId = token_docode.id

//     next()

//   } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
//   }
// }

// export default authUser;


// const authUser = async (req, res, next) => {

//   // Check both "Authorization" and "atoken"
//   const authHeader = req.headers.authorization || req.headers.token;


//   if (!authHeader) {
//     return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
//   }

//   // Extract token from either format
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;




//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = decoded.id


//     if (decoded.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied. Admins only." });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("🔥 Middleware authentication error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token." });
//   }
// };
// export default authUser;

import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    // Check for token in authorization header
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      console.log("No authorization header found");
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
    }

    // Extract token from header
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
      console.log("Token is empty after extraction");
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token format." });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified successfully:", decoded);

      // Make sure the decoded token has an id
      if (!decoded.id) {
        console.log("Token does not contain user ID");
        return res.status(401).json({ success: false, message: "Invalid token: No user ID found." });
      }

      // Attach user details to req
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.log("JWT verification error:", jwtError.message);
      return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
  } catch (error) {
    console.log("Auth middleware error:", error.message);
    res.status(500).json({ success: false, message: "Server error during authentication." });
  }
};

export default authUser;

