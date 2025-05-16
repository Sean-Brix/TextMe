# 💬 TextMe

A real-time chat application built with **React**, **Node.js**, and **Socket.IO**. Designed for instant messaging with a smooth user experience, responsive design, and modern UI.

---

## 🚀 Features

- 🔒 User Authentication (Register & Login)
- 💬 Real-Time Messaging (via WebSockets)
- 🟢 Online/Offline Presence Indicator
- 🔍 Search Friends & Conversations
- 📱 Mobile-Responsive Layout
- ✨ Clean, modular React component structure
- 📦 RESTful API built with Express & MongoDB (Mongoose)

---

## 🛠️ Tech Stack

**Frontend:**
- React
- CSS Modules / Tailwind / SCSS (depending on your choice)
- Axios
- Socket.IO-client

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- JWT (for auth)
- bcrypt (for password hashing)

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Seann-Brix/TextMe.git
   cd chat-app

2. **Install server dependencies:**
   ```bash
   cd server
   npm install

4. **Install client dependencies:**
   ```bash
   cd ../client
   npm install

5. **Create environment files:**
   ```bash
   MONGODB_URI=mongodb://localhost:27017/TextMe
   JWT_SECRET=your_secret

6. **Start development servers:**
   ```bash
   npm run dev
   cd ../server
   npm run dev
