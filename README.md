# 📋 Mini Exam Result Module System

A full-stack **MERN** application for managing student exam results. Supports complete CRUD for students, subjects, and results with JWT authentication, live debounced search, and a professional printable report card.

---

## 📑 Table of Contents

- [Project Structure](#️-project-structure)
  - [Backend Structure](#-backend-structure)
  - [Frontend Structure](#-frontend-structure)
- [Prerequisites](#-prerequisites)
- [Backend Setup](#️-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Quick Start](#-quick-start-run-both-servers)
- [API Reference](#-api-reference)
  - [Endpoints](#endpoints)
  - [Search & Filter Query Parameters](#-search--filter-query-parameters)
- [Frontend Routes](#-frontend-routes)
- [Tech Stack](#️-tech-stack)
- [Authentication](#-authentication)
- [API Documentation (Swagger)](#-api-documentation-swagger)
- [Print Report Card](#️-print-report-card)

---


## 🗂️ Project Structure

```
Mini Exam Result Module System/
├── backend/        # Express.js REST API + MongoDB
├── frontend/       # React 19 + Vite + Tailwind CSS v4
└── README.md
```

### 📁 Backend Structure

```
backend/
├── index.js                        # Entry point — starts the HTTP server
├── package.json
├── .env                            # Environment variables (create this manually)
└── src/
    ├── app.js                      # Express app, middleware & route registration
    ├── config/
    │   ├── constants.js            # HTTP status codes & app-wide constants
    │   ├── db.js                   # MongoDB connection logic
    │   └── env.js                  # Environment variable loader & validation
    ├── middlewares/
    │   ├── authMiddleware.js       # JWT authentication guard
    │   ├── errors.js               # Global error handler
    │   ├── validations.js          # express-validator result checker
    │   └── validators.js           # Request body validation rule definitions
    ├── models/
    │   ├── admin.js                # Admin (user) Mongoose schema
    │   ├── student.js              # Student Mongoose schema
    │   ├── subject.js              # Subject Mongoose schema (with custom validator)
    │   └── result.js               # Result Mongoose schema (with grade & pass logic)
    ├── modules/                    # Feature modules — each has controller, service, routes
    │   ├── auth/
    │   │   ├── auth.controller.js
    │   │   ├── auth.service.js
    │   │   └── auth.routes.js
    │   ├── student/
    │   │   ├── student.controller.js
    │   │   ├── student.service.js
    │   │   └── student.routes.js
    │   ├── subject/
    │   │   ├── subject.controller.js
    │   │   ├── subject.service.js
    │   │   └── subject.routes.js
    │   ├── result/
    │   │   ├── result.controller.js
    │   │   ├── result.service.js
    │   │   └── result.routes.js
    │   └── dashboard/
    │       ├── dashboard.controller.js
    │       └── dashboard.routes.js
    └── utils/
        ├── gradeCalculator.js      # Auto-calculates grade, percentage & pass/fail
        ├── pagination.js           # Reusable pagination helpers
        ├── responseHelper.js       # Standardised API response format
        └── seeder.js               # Seeds the default admin user into the database
```

### 📁 Frontend Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env                            # VITE_API_URL — backend base URL
└── src/
    ├── main.jsx                    # React 19 entry point
    ├── App.jsx                     # Router setup, route definitions & layout wiring
    ├── index.css                   # Tailwind v4 imports, theme tokens & @media print styles
    ├── apis/
    │   └── axios.js                # Axios instance with JWT request/response interceptors
    ├── context/
    │   └── AuthContext.jsx         # Global auth state — login, logout, token persistence
    ├── components/
    │   ├── ProtectedRoute.jsx      # Redirects unauthenticated users to /login
    │   └── Layout/
    │       ├── AdminLayout.jsx     # Main layout shell (Sidebar + Header + Outlet)
    │       ├── Sidebar.jsx         # Navigation menu with active link highlighting
    │       └── Header.jsx          # Top bar with admin badge and logout button
    └── pages/
        ├── Login.jsx               # Login form with Yup validation
        ├── Dashboard.jsx           # Stats overview (students, subjects, results, pass/fail)
        ├── Students/
        │   ├── StudentList.jsx     # Paginated list — search by name/roll, filter by class
        │   └── StudentForm.jsx     # Add / Edit student (shared form)
        ├── Subjects/
        │   ├── SubjectList.jsx     # Paginated list — search by name or code
        │   └── SubjectForm.jsx     # Add / Edit subject with pass/full marks validation
        └── Results/
            ├── ResultList.jsx      # Paginated list — search by exam name
            ├── ResultForm.jsx      # Add result with dynamic multi-subject rows
            └── ResultDetail.jsx    # Full report card with printer-friendly layout
```

---

## ✅ Prerequisites

Make sure the following are installed before getting started:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally, **or** a MongoDB Atlas connection string
- [npm](https://www.npmjs.com/) v9 or higher

---

## ⚙️ Backend Setup

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory with the following content:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/exam-result-db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

> 💡 Replace `MONGO_URI` with your MongoDB Atlas connection string if you are not running MongoDB locally.

### 4. Seed the database

Run the seeder to create the default admin account:

```bash
npm run seed
```

This creates an admin user with the following credentials:

| Field    | Value             |
|----------|-------------------|
| Email    | `admin@exam.com`  |
| Password | `admin123`        |

### 5. Start the backend server

```bash
# Development — hot reload via nodemon
npm run dev

# Production
npm start
```

The API will be available at: **`http://localhost:8000`**

---

## 🎨 Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000/api
```

> 💡 The frontend will fall back to `http://localhost:8000/api` if the variable is not set.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at: **`http://localhost:5173`**

---

## 🚀 Quick Start (Run Both Servers)

Open **two separate terminals** and run:

**Terminal 1 — Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```

Then visit **http://localhost:5173** and log in with the seeded admin credentials.

---

## 🌐 API Reference

### Endpoints

| Method | Endpoint                            | Description                  | Auth |
|--------|-------------------------------------|------------------------------|------|
| POST   | `/api/auth/login`                   | Admin login, returns JWT     | ❌    |
| GET    | `/api/health`                       | API health check             | ❌    |
| GET    | `/api/students`                     | List students (paginated)    | ✅    |
| POST   | `/api/students`                     | Create a new student         | ✅    |
| GET    | `/api/students/:id`                 | Get student by ID            | ✅    |
| PUT    | `/api/students/:id`                 | Update student by ID         | ✅    |
| DELETE | `/api/students/:id`                 | Delete student by ID         | ✅    |
| GET    | `/api/subjects`                     | List subjects (paginated)    | ✅    |
| POST   | `/api/subjects`                     | Create a new subject         | ✅    |
| GET    | `/api/subjects/:id`                 | Get subject by ID            | ✅    |
| PUT    | `/api/subjects/:id`                 | Update subject by ID         | ✅    |
| DELETE | `/api/subjects/:id`                 | Delete subject by ID         | ✅    |
| GET    | `/api/results`                      | List results (paginated)     | ✅    |
| POST   | `/api/results`                      | Create a new result          | ✅    |
| GET    | `/api/results/:id`                  | Get result by ID (populated) | ✅    |
| DELETE | `/api/results/:id`                  | Delete result by ID          | ✅    |
| GET    | `/api/results/student/:studentId`   | All results for a student    | ✅    |
| GET    | `/api/dashboard/summary`            | Aggregate stats for dashboard| ✅    |

### 🔍 Search & Filter Query Parameters

| Endpoint             | Parameter   | Description                           |
|----------------------|-------------|---------------------------------------|
| `GET /api/students`  | `search`    | Search by student name or roll number |
| `GET /api/students`  | `className` | Filter by class name                  |
| `GET /api/subjects`  | `search`    | Search by subject name or code        |
| `GET /api/results`   | `examName`  | Filter by exam name                   |
| All list endpoints   | `page`      | Page number (default: `1`)            |
| All list endpoints   | `limit`     | Results per page (default: `10`)      |

---

## 📱 Frontend Routes

| Route                 | Page                                          |
|-----------------------|-----------------------------------------------|
| `/login`              | Admin login page                              |
| `/dashboard`          | Overview — student, subject & result counts   |
| `/students`           | Students list with search & class filter      |
| `/students/add`       | Add new student form                          |
| `/students/edit/:id`  | Edit existing student form                    |
| `/subjects`           | Subjects list with search                     |
| `/subjects/add`       | Add new subject form                          |
| `/subjects/edit/:id`  | Edit existing subject form                    |
| `/results`            | Results list with exam name search            |
| `/results/add`        | Add result with dynamic multi-subject entry   |
| `/results/:id`        | Result detail — view & print report card      |

---

## 🛠️ Tech Stack

### Backend
| Technology        | Purpose                          |
|-------------------|----------------------------------|
| Node.js           | JavaScript runtime               |
| Express.js v5     | HTTP framework                   |
| MongoDB           | NoSQL database                   |
| Mongoose v9       | ODM for MongoDB                  |
| jsonwebtoken      | JWT generation & verification    |
| bcryptjs          | Password hashing                 |
| express-validator | Request validation               |
| nodemon           | Hot reload in development        |
| morgan            | HTTP request logger              |

### Frontend
| Technology        | Purpose                          |
|-------------------|----------------------------------|
| React 19          | UI framework                     |
| Vite 8            | Build tool & dev server          |
| Tailwind CSS v4   | Utility-first styling            |
| React Router v7   | Client-side routing              |
| Axios             | HTTP client with interceptors    |
| React Hook Form   | Performant form management       |
| Yup               | Schema-based form validation     |
| Lucide React      | Icon library                     |
| React Toastify    | Toast notifications              |

---

## 📖 API Documentation (Swagger)

This project ships with a full **Swagger / OpenAPI 3.0** interactive documentation UI powered by `swagger-ui-express` and `swagger-jsdoc`.

### Accessing the Docs

Start the backend server, then open in your browser:

```
http://localhost:8000/api-docs
```

### Features

| Feature | Details |
|---|---|
| **UI** | Interactive Swagger UI — test every endpoint directly from the browser |
| **Auth** | Click **Authorize** → paste your JWT from `POST /auth/login` → all protected endpoints unlock |
| **Persist Auth** | `persistAuthorization: true` — token stays saved across page refreshes |
| **Schemas** | Full request/response schemas for Student, Subject, Result, Auth, Pagination, and Error |
| **Tags** | Endpoints grouped by module: Auth · Students · Subjects · Results · Dashboard |

### How to Authenticate in Swagger

1. Call `POST /auth/login` with your credentials (no auth required)
2. Copy the `token` value from the response
3. Click the **🔓 Authorize** button (top-right of the Swagger UI)
4. Paste the token in the **Value** field (format: just the token, no `Bearer` prefix needed)
5. Click **Authorize** — all protected routes are now unlocked for testing

### Files

| File | Purpose |
|---|---|
| `backend/src/config/swagger.js` | OpenAPI 3.0 definition — info, servers, security schemes, and all component schemas |
| `backend/src/app.js` | Mounts `swagger-ui-express` at `/api-docs` |
| `*/routes.js` | Each route file contains `@swagger` JSDoc annotations for all endpoints |

---

## 🔐 Authentication

- All API routes except `/api/auth/login` and `/api/health` require a valid **Bearer JWT token** in the `Authorization` header.
- The frontend attaches the token automatically on every request via an **Axios request interceptor**.
- If the API returns `401 Unauthorized`, the frontend clears the token and **redirects the user to `/login`** automatically.
- All frontend pages under `AdminLayout` are wrapped in a `ProtectedRoute` component that checks for a valid token in `localStorage`.

---

## 🖨️ Print Report Card

Navigate to **Results → click the eye (view) icon** on any result row to open the detail page, then click **Print**.

The print layout automatically:
- ✅ Hides the sidebar and top navigation bar
- ✅ Shows a formal school system header
- ✅ Displays full subject-wise marks table
- ✅ Shows total marks, percentage, and letter grade
- ✅ Adds signature lines for Class Teacher and Principal
- ✅ Adjusts background colours for paper rendering

---

> END
