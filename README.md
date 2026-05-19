# AtomQuest Goal Tracker Portal

Welcome to the **AtomQuest Goal Tracker**, a modern, hackathon-ready employee productivity and goal-tracking platform. It is designed to boost workplace engagement using powerful productivity tools, an AI assistant, and a built-in gamification system.

---

## 🌟 Key Features

### Role-Based Access Control (RBAC)
The application dynamically adjusts its views and permissions based on user roles:
- **Admin**: Full system oversight, audit logs, user management, and platform-wide reporting.
- **Manager**: Team oversight, tracking team goals, and managing performance reviews.
- **Employee**: Individual goal tracking, check-ins, and daily task management.

### Productivity & Engagement Tools
- **Gamification Engine**: Users earn achievements and track progression stats as they complete goals, keeping engagement high.
- **Pomodoro Timer**: A built-in focus timer (in the Employee Dashboard) to encourage deep work sessions without leaving the platform.
- **AI Assistant**: Smart goal setting and tracking guidance powered by an integrated AI widget.
- **Bento Box UI**: A sleek, premium, modern dashboard interface utilizing glassmorphism and subtle Framer Motion animations.

---

## 🛠 Tech Stack

**Frontend:**
- **React 19** (via Vite)
- **Tailwind CSS v4** for utility-first styling.
- **Framer Motion** for smooth UI transitions and micro-animations.
- **Recharts** for visualizing goal completion and statistics.
- **React Router v7** for frontend routing and protected routes.

**Backend:**
- **Node.js & Express.js** for handling the REST API.
- **MongoDB & Mongoose** as the primary NoSQL database and ODM.
- **JWT (JSON Web Tokens) & bcryptjs** for secure, stateless user authentication and password hashing.

---

## 🚀 Installation & Setup Guide (From Scratch)

Follow these steps to get the project running on your local machine from scratch to complete setup.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally, or use a MongoDB Atlas cloud URI)
- Git

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd AtomQuest_Goal_tracker_portal
```

### 3. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.
```bash
cd backend
npm install
```

**Create a `.env` file** inside the `backend` folder and add the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atomquest
JWT_SECRET=your_super_secret_jwt_key
```
*Note: Replace `MONGODB_URI` with your Atlas connection string if you are not using a local MongoDB instance.*

**Start the Backend Server:**
```bash
# For development with auto-restart
npm run dev

# Or for standard start
npm start
```
The backend should now be running on `http://localhost:5000`.

### 4. Frontend Setup
Open a new terminal window/tab, navigate to the frontend directory, and install dependencies.
```bash
cd frontend
npm install
```

**Start the Frontend Development Server:**
```bash
npm run dev
```
Vite will typically start the server on `http://localhost:5173`. Open this URL in your browser to view the application.

---

## 📂 Project Structure

```text
AtomQuest_Goal_tracker_portal/
│
├── backend/                # Node.js + Express Backend
│   ├── config/             # Database connection setup
│   ├── controllers/        # Route logic (auth, goals)
│   ├── middleware/         # Auth & Role verification (JWT)
│   ├── models/             # Mongoose schemas (User, Goal)
│   ├── routes/             # API endpoint definitions
│   └── server.js           # Main entry point for the backend
│
├── frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── Components/     # Reusable UI (Sidebar, Navbar, GoalForm)
│   │   ├── features/       # Advanced tools (AI, Pomodoro, Gamification)
│   │   ├── pages/          # Role-based views (Admin, Manager, Employee)
│   │   ├── hooks/          # Custom state logic (useGoals, useGamification)
│   │   └── App.jsx         # Root component & Routing
│   ├── tailwind.config.js  # Styling configuration
│   └── package.json        # Frontend dependencies
│
└── ARCHITECTURE.md         # Full System Architecture Diagram
```

---

## 🧠 Architecture
For a deep dive into how data flows through the application and the interaction between the frontend, backend, and database, please see the [ARCHITECTURE.md](./ARCHITECTURE.md) file located in the root directory. This file includes interactive Mermaid diagrams that natively render on GitHub.