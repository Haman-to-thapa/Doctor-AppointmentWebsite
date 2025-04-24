import multer from "multer";

const storage = multer.diskStorage({
  filename:function(req, file, callback) {
   return callback(null, `${Date.now()}-${file.originalname}`)
  }
})


const upload = multer({storage : storage})

export default upload;


// import multer from "multer";
// import path from "path";
// import fs from 'fs'


// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, ); // Store files in "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file
//   }
// });


// const upload = multer({storage})
// export default upload