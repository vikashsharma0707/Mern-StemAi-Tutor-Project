# 🚀 STEMAI Tutor - AI Powered STEM Learning Platform

**An intelligent, interactive, and personalized AI tutor for STEM students.**

STEMAI Tutor combines the power of advanced AI models with a modern full-stack architecture to deliver an exceptional learning experience.

![Demo](https://via.placeholder.com/800x400?text=STEMAI+Tutor+Dashboard) <!-- Add real screenshot here -->

## 🔗 Live Links

- **Live Demo (Vercel)**: [https://lnkd.in/dPFxTGpV](https://lnkd.in/dPFxTGpV)
- **Backend (Render)**: [https://lnkd.in/dP3Bs3S8](https://lnkd.in/dP3Bs3S8)
- **GitHub Repository**: [https://lnkd.in/dKWUu2Q6](https://lnkd.in/dKWUu2Q6)

---

## ✨ Features

### **AI-Powered Learning**
- **AI Chat Tutor** — Real-time step-by-step explanations using **Claude 3.5 Sonnet** & **Gemini Flash 1.5**
- **Image Solver** — Upload handwritten or printed questions and get instant AI solutions
- **Voice Input & Output** — Speak your questions and listen to answers
- **Concept Visualizer** — AI-generated interactive Mermaid diagrams (Flowcharts, Mind Maps, etc.)
- **Adaptive Quizzes** — Smart difficulty adjustment based on performance
- **Practice Questions** — AI-generated questions with subject, topic & difficulty filters

### **Personalization & Analytics**
- **Personalized Learning Paths** — Weekly study plans tailored to your needs
- **Progress Analytics** — Beautiful charts, accuracy heatmap, weak area detection
- **History** — Complete record of chats, quizzes, and solved questions

### **User Experience**
- Secure JWT authentication
- Fully responsive design
- Clean and modern UI

---

## 🛠 Tech Stack

### **Frontend**
- React 18 + Vite
- React Router DOM
- Chart.js
- Mermaid.js
- Lucide Icons
- Web Speech API (Voice)

### **Backend**
- Node.js + Express.js
- MongoDB Atlas
- JWT Authentication
- bcryptjs

### **AI Integration**
- OpenRouter API
- Claude 3.5 Sonnet
- Gemini Flash 1.5

### **DevOps & Deployment**
- Docker & Docker Compose
- Kubernetes (Deployments, Services, Ingress, Secrets)
- GitHub Actions CI/CD
- Docker Hub
- Vercel (Frontend)
- Render (Backend)

---

## 📁 Project Structure
stemai-tutor/
├── client/                 # React Frontend
├── server/                 # Node.js Backend
├── kubernetes/             # K8s manifests
├── .github/workflows/      # CI/CD pipeline
├── docker-compose.yml
├── .env.example
└── README.md
text---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas or local MongoDB
- OpenRouter API Key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd stemai-tutor
2. Setup Backend
Bashcd server
npm install
cp .env.example .env
# Add your MONGO_URI, JWT_SECRET, OPENROUTER_API_KEY
npm run dev
3. Setup Frontend
Bashcd ../client
npm install
npm run dev

🐳 Docker Setup
Bash# Copy environment file
cp .env.example .env

# Build and run
docker-compose up --build -d
Access the app at http://localhost

☸️ Kubernetes Deployment
Bashkubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/secret.yaml
kubectl apply -f kubernetes/

📸 Screenshots
(Add 4-6 screenshots here: Dashboard, AI Chat, Image Solver, Analytics, Quiz, Visualizer)

🌟 What Makes STEMAI Tutor Special?

Built in just 2 days during a hackathon
Production-ready with Docker + Kubernetes
Automated CI/CD pipeline
Multi-AI model integration
Focus on real learning outcomes



📝 Environment Variables





























VariableDescriptionRequiredMONGO_URIMongoDB connection stringYesJWT_SECRETSecret key for JWTYesOPENROUTER_API_KEYOpenRouter API keyYesNODE_ENVdevelopment or productionNo

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

📄 License
This project is licensed under the MIT License.

Made with ❤️ for students who want to learn better.