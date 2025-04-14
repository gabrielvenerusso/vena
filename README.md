# Authentication System with NestJS and React

This is a fullstack project using **NestJS** for the backend and **React** for the frontend. It features **user registration**, **login**, and **JWT-based route protection**.

## Technologies

- Backend: NestJS + TypeORM + SQL Server
- Frontend: React + React Router DOM

---

## 🔧 How to Run

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
```

### 2. Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
> Make sure your SQL Server database is running with a `Usuarios` table and correctly configured in `.env` or `app.module.ts`

### 3. Frontend (React)
```bash
cd frontend
npm install
npm start
```
> The app will open at `http://localhost:3000` (or `3001` if port 3000 is busy).

---

## 📂 Structure

**Backend**:
- `auth/`: login, registration, and JWT
- `usuario/`: user entity and service

**Frontend**:
- `pages/LoginPage.jsx`
- `pages/RegisterPage.jsx`
- `App.js`: routes

---

## ✅ Features
- User registration
- Login with JWT validation
- Token stored in localStorage
- Protected frontend/backend routes

---

## 📌 Author
Made by Gabriel Venerusso - [@gabrielvenerusso](https://github.com/gabrielvenerusso)
