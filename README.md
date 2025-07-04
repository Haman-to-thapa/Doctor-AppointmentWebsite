# Doctor Appointment System

A complete doctor appointment booking system with user, doctor, and admin panels.

## Features

- User authentication and profile management
- Doctor listing and filtering by speciality
- Appointment booking and management
- Admin panel for managing doctors and appointments
- Payment integration with Razorpay

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Payment Gateway**: Razorpay

## Deployment to Render

### Option 1: Using the Render Dashboard

1. **Deploy the Backend API**:
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set the Root Directory to `backend_project`
   - Set the Build Command to `npm install`
   - Set the Start Command to `npm start`
   - Add all the required environment variables (see below)
   - Click "Create Web Service"

2. **Deploy the Frontend**:
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set the Root Directory to `frontend`
   - Set the Build Command to `npm install && npm run build`
   - Set the Publish Directory to `dist`
   - Add the environment variable `VITE_BACKEND_URL` with the URL of your backend service
   - Click "Create Static Site"

3. **Deploy the Admin Panel**:
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set the Root Directory to `admin`
   - Set the Build Command to `npm install && npm run build`
   - Set the Publish Directory to `dist`
   - Add the environment variable `VITE_BACKEND_URL` with the URL of your backend service
   - Click "Create Static Site"

### Option 2: Using the Render Blueprint (render.yaml)

1. Fork this repository to your GitHub account
2. Go to the Render Dashboard and click on "New Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file and create all the services
5. You'll need to manually set the secret environment variables

## Required Environment Variables

### Backend API

- `MONGODB_URL`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `CLOUDINARY_NAME`: Your Cloudinary name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_SECRET_KEY`: Your Cloudinary secret key
- `ADMIN_EMAIL`: Admin email (default: admin@prescripto.com)
- `ADMIN_PASSWORD`: Admin password
- `RAZORPAY_KEY_ID`: Your Razorpay key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay key secret
- `CURRENCY`: Currency code (default: INR)
- `FRONTEND_URL`: URL of your frontend service
- `ADMIN_URL`: URL of your admin panel service

### Frontend

- `VITE_BACKEND_URL`: URL of your backend API service
- `VITE_RAZORPAY_KEY_ID`: Your Razorpay key ID

### Admin Panel

- `VITE_BACKEND_URL`: URL of your backend API service

## Local Development

1. Clone the repository
2. Install dependencies for each service:
   ```
   cd backend_project && npm install
   cd frontend && npm install
   cd admin && npm install
   ```
3. Create a `.env` file in the backend_project directory with all the required environment variables
4. Create a `.env` file in the frontend directory with the required environment variables
5. Create a `.env` file in the admin directory with the required environment variables
6. Start the development servers:
   ```
   # Terminal 1
   cd backend_project && npm run server
   
   # Terminal 2
   cd frontend && npm run dev
   
   # Terminal 3
   cd admin && npm run dev
   ```

## Admin Login Credentials

- Email: admin@prescripto.com
- Password: qwerty123

## License

This project is licensed under the MIT License.
#   D o c t o r - A p p o i n t m e n t W e b s i t e  
 