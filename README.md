# STEMAI Tutor — AI-Powered STEM Education Platform

An intelligent tutoring web application that helps students learn STEM subjects (Math, Physics, Chemistry, Biology, Computer Science) using AI. Built with React, Express, MongoDB, and OpenRouter API.

## Features

- **Authentication** — Register & Login with JWT protection
- **Dashboard** — Welcome stats, quick actions, recent activity
- **AI Chat Tutor** — Real-time chat with step-by-step explanations
- **Practice Questions** — AI-generated MCQs by subject, topic, difficulty
- **Image Question Solver** — Upload photo, get step-by-step solution via vision model
- **History & Progress** — Track all learning activity and accuracy

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| AI | OpenRouter API (Claude 3.5 Sonnet / Gemini Flash) |
| Auth | JWT, bcryptjs |
| Styling | Pure External CSS (dark theme) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- OpenRouter API key

### 1. Clone and Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken axios multer
```

### 2. Configure Environment

Copy the example env file and add your keys:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
- Set `MONGODB_URI` to your MongoDB connection string
- Set `JWT_SECRET` to a secure random string
- Set `OPENROUTER_API_KEY` to your OpenRouter API key

### 3. Start the Backend

```bash
cd backend
node server.js
```

### 4. Start the Frontend

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Project Structure

```
stemai-tutor/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── practiceController.js
│   │   ├── imageController.js
│   │   └── historyController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   ├── Practice.js
│   │   └── ImageSolution.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── practice.js
│   │   ├── image.js
│   │   └── history.js
│   ├── utils/openrouter.js
│   ├── .env
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── public/favicon.svg
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Sidebar.css
│       │   ├── MobileNav.jsx
│       │   └── MobileNav.css
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Auth.css
│       │   ├── Dashboard.jsx
│       │   ├── Dashboard.css
│       │   ├── ChatTutor.jsx
│       │   ├── ChatTutor.css
│       │   ├── Practice.jsx
│       │   ├── Practice.css
│       │   ├── ImageSolver.jsx
│       │   ├── ImageSolver.css
│       │   ├── History.jsx
│       │   └── History.css
│       ├── styles/global.css
│       ├── utils/api.js
│       ├── App.jsx
│       └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/stats` | Update user stats |
| POST | `/api/chat` | Send message to AI tutor |
| GET | `/api/chat` | Get chat history |
| GET | `/api/chat/:id` | Get specific chat |
| POST | `/api/practice/generate` | Generate practice questions |
| POST | `/api/practice/submit` | Submit practice answers |
| GET | `/api/practice` | Get practice history |
| POST | `/api/image/solve` | Solve question from image |
| GET | `/api/image/history` | Get image solution history |
| GET | `/api/history` | Get all activity history |

## Design

- Dark theme: `#0f172a` background, `#1e293b` cards
- Primary: Indigo `#6366f1`, Accent: Cyan `#22d3ee`
- Inter font family
- Fully responsive (mobile + desktop)
- Sidebar navigation on desktop, hamburger on mobile

## License

MIT
