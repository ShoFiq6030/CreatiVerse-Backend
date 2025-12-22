# CreatiVerse Backend API

A comprehensive backend API for the CreatiVerse platform - a creative contest management system where users can participate in various creative competitions, submit their work, and compete for prizes.

## 📖 Overview

CreatiVerse is a full-stack application that allows users to:

- **Browse and participate** in various creative contests (design, writing, photography, coding, etc.)
- **Submit creative work** to contests with text descriptions and images
- **Manage payments** for contest participation using SSLCommerz
- **Track contest progress** and view winners
- **User authentication** with email verification and Google OAuth

## 🚀 Features

### Core Features
- **User Management**: Registration, authentication, email verification, Google OAuth
- **Contest Management**: Create, browse, and manage creative contests
- **Submission System**: Submit creative work with text and images
- **Payment Integration**: SSLCommerz integration for contest fees
- **Role-based Access**: User, Creator, and Admin roles
- **Real-time Updates**: Contest status tracking and winner announcements

### Contest Types Supported
- Image Design
- Logo Design  
- Photography
- Article Writing
- Story Writing
- Poetry Writing
- Business Ideas
- Startup Pitches
- Gaming Reviews
- Coding Challenges
- Web Design
- Video Editing
- Meme Creation
- Marketing Strategies
- Innovation Challenges
- Custom Categories

## 🛠️ Tech Stack

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing
- **SSLCommerz** - Payment gateway
- **Google Auth Library** - OAuth integration
- **Firebase Admin** - Firebase services

### Development Tools
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **express-validator** - Input validation

## 📁 Project Structure

```
src/
├── app.js                    # Main application file
├── server.js                 # Server entry point
├── config/
│   ├── db.js                # Database connection
│   └── index.js             # Configuration management
├── emails/
│   └── verification.html    # Email templates
├── firebase/
│   └── firebaseAdmin.js     # Firebase configuration
├── middlewares/
│   └── auth.js              # Authentication middleware
├── modules/
│   ├── auth/                # Authentication module
│   ├── contests/            # Contest management
│   ├── payments/            # Payment processing
│   ├── submissions/         # Submission handling
│   └── users/               # User management
└── utils/
    ├── jwtToken.js          # JWT utilities
    └── nodeMailer.js        # Email utilities
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SSLCommerz merchant account
- Google OAuth credentials

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShoFiq6030/CreatiVerse-Backend.git
   cd CreatiVerse-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGODB_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GMAIL_USER=your_gmail_address
   GOOGLE_APP_PASSWORD=your_app_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URL=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   SSL_COMMERZ_STORE_ID=your_sslcommerz_store_id
   SSL_COMMERZ_STORE_PASSWD=your_sslcommerz_store_password
   BACKEND_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 API Documentation

Comprehensive API documentation is available at:
[Postman Documentation](https://documenter.getpostman.com/view/26622927/2sB3dWsnYx)

### Base URL
```
https://creati-verse-backend.vercel.app/api/v1
```

### Available Endpoints

#### Authentication (`/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /google-login` - Google OAuth login
- `POST /verify-email` - Email verification
- `POST /refresh-token` - Token refresh
- `POST /logout` - User logout

#### Contests (`/contest`)
- `POST /` - Create new contest
- `GET /` - Get all contests
- `GET /:id` - Get contest by ID
- `PUT /:id` - Update contest
- `DELETE /:id` - Delete contest
- `POST /:id/participate` - Join contest
- `GET /:id/participants` - Get contest participants

#### Submissions (`/submissions`)
- `POST /` - Submit creative work
- `GET /` - Get all submissions
- `GET /:id` - Get submission by ID
- `PUT /:id` - Update submission
- `DELETE /:id` - Delete submission
- `GET /user/:userId` - Get user's submissions
- `GET /contest/:contestId` - Get contest submissions

#### Users (`/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user account
- `GET /profile` - Get current user profile

#### Payments (`/payments`)
- `POST /initiate` - Initiate payment
- `POST /verify` - Verify payment
- `GET /user/:userId` - Get user payments
- `GET /contest/:contestId` - Get contest payments

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Email Verification** - Mandatory email verification for account security
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Comprehensive input validation and sanitization
- **Role-based Access Control** - User, Creator, and Admin roles

## 🚀 Deployment

### Vercel Deployment
This project is configured for Vercel deployment with the following settings:

1. **Environment Variables**: Set all required environment variables in Vercel dashboard
2. **Build Command**: `npm install`
3. **Output Directory**: Leave empty (API routes)
4. **Node.js Version**: 18.x or higher

### Database Configuration
- **Local Development**: Use MongoDB Atlas or local MongoDB instance
- **Production**: MongoDB Atlas recommended for scalability

## 📋 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": { /* response data */ },
  "error": { /* error details if any */ }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation for implementation details

## 🙏 Acknowledgments

- MongoDB for the excellent database solution
- Express.js for the robust web framework
- SSLCommerz for payment processing
- Google for OAuth integration
- Postman for API documentation

---

**CreatiVerse Backend** - Empowering creativity through technology
