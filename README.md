# STEMAI Tutor

A modern MERN stack web application for STEM education.

## Tech Stack

- **Frontend**: React.js, Vite, React Router DOM, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs

## Project Structure

```
stemai-tutor/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # Global CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── config/             # Database config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stemai-tutor
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Development

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

```bash
cd client
npm run build
```

## API Endpoints

| Method | Endpoint       | Description       | Auth |
|--------|----------------|-------------------|------|
| POST   | /api/auth/register | Register user  | No   |
| POST   | /api/auth/login    | Login user     | No   |
| GET    | /api/auth/me       | Get current user | Yes |
| GET    | /api/users/profile | Get profile    | Yes  |
| PUT    | /api/users/profile | Update profile | Yes  |

## License

MIT
