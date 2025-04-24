# Doctor Appointment Backend API

This is the backend API for the Doctor Appointment application.

## API Endpoints

- `/api/doctor/list` - Get a list of all doctors
- `/api/admin` - Admin endpoints
- `/api/user` - User endpoints

## Test Endpoint

- `/test-doctor-list` - Test endpoint for doctor list

## Development

```bash
npm run server
```

## Production

```bash
npm start
```

## Deployment

This application is deployed on Render.com.

### Environment Variables

- `NODE_ENV` - Environment (development, production)
- `PORT` - Port to run the server on
- `FRONTEND_URL` - URL of the frontend application
- `ADMIN_URL` - URL of the admin application
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
