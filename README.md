# 🎓 CoachifyTree

CoachifyTree is a full-featured educational platform designed for coaching institutes. It offers role-based dashboards and tools for Students, Teachers, Admins, and Guests. Built with React.js, Tailwind CSS, Express.js, and MongoDB, it supports test scheduling, notices, user management, and integrates with Google Sheets to visualize data.

## 🚀 Live Demo

🌐 [Visit CoachifyTree](https://coachifytree.pages.dev)

## 🧠 Features

### ✅ General
- JWT-based **Authentication & Authorization**
- Role-based **Access Control** (Student, Teacher, Admin, Guest)
- Fully **Responsive UI** with Tailwind CSS

### 👩‍🎓 Student Dashboard
- View assigned tests schedules and notices
- Access study content and materials
- Track progress through dynamic charts (via Google Sheets)

### 👨‍🏫 Teacher Dashboard
- Schedule tests for students
- Publish notices and study content
- View submissions and analytics

### 👨‍💼 Admin Dashboard
- Manage student, teacher accounts
- Uploads progress records and marks of students
- Control content visibility
- Monitor platform activity

### 👤 Guest Access
- Browse public/free content
- Read institute information

### 📊 Data Visualization
- Real-time charts using **Chart.js**
- Data fetched and synced from **Google Sheets**

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Redux (for state management)
- Tailwind CSS (UI Styling)
- Axios (API communication)
- Chart.js (Data visualization)

### Backend
- Express.js
- MongoDB (via Mongoose)
- JWT (Authentication)
- Google Sheets API

## 🗂️ Project Structure
coachifytree/
├── frontend/ # React frontend
├── backend/ # Express backend
├── .env # Environment variables
├── README.md
