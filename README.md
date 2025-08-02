# 📋 Engineering Resource Management System (ERMS)

**ERMS** is a role-based resource and project management platform for engineering teams. Managers can create projects, assign engineers, and track resource allocation, while engineers can view their assigned projects and tasks. The dashboard provides clear insights into workload, capacity, and project status.

---

## 🚀 Live Demo

👉 [Frontend Live](https://erms-frontend-g9oz.vercel.app)  

---

## ⚙️ Quick Start

### 🔹 Frontend
```
git clone https://github.com/abhiseksikdar40/erms-frontend.git
cd erms-frontend
npm install
npm run dev
````

### 🔹 Backend
```
git clone https://github.com/abhiseksikdar40/erms-backend.git
cd erms-backend
npm install
npm run dev
```

> Backend is deployed using Vercel's Serverless Functions.

---

## 🛠️ Technologies Used

* React.js
* Bootstrap 5
* CSS
* React Router DOM
* Recharts.js
* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Tokens)
* Vercel Serverless Deployment

---

## 🎥 Demo Walkthrough

🎬 [Watch Demo Video](https://drive.google.com/file/d/19SVeo3u4UQKlYmfJWgFU6LyP0oI6Wwqy/view) (5:04 Min)

---

## ✨ Features

### 👤 Authentication

* Signup & login with JWT token-based authentication
* Role-based access (Manager / Engineer)

### 📁 Project Management

* Managers can create, update Projects
* Engineers can view only their assigned projects and tasks

### 📝 Task Management

* Managers assign tasks to engineers with time ranges and allocation %
* Engineers can view tasks assigned to them

### 📊 Dashboard Insights

* Bar charts showing engineer capacity utilization
* Task allocation reports by project
* Scrollable project lists for better visibility

### 🔐 Role-Based Access Control

* Only Managers can create/update/view all projects and tasks
* Engineers see only their own tasks/projects

---

🔑 Test Credentials
You can log in with these pre-created test accounts:

🔹 Manager Login

Email: ananya.manager@example.com

Password: SecurePass123

🔹 Engineer Login

Email: ravi.kumar@example.com

Password: Ravi@123

Or create your own user from the Signup page and explore the application as a Manager or Engineer.

---


## 📡 API Reference

### 🔹 User

```http
POST /v1/signup/user
```

```json
{
  "userName": "Jane Doe",
  "userEmail": "jane@example.com",
  "userPassword": "secure123",
  "userRole": "Engineer",
  "userSkills": ["React", "Node"],
  "userSeniority": "Mid"
}
```

```http
POST /v1/login
```

---

### 🔹 Projects

```http
GET /v1/projects
POST /v1/create/projects
```

```json
{
  "projectName": "CRM Migration",
  "description": "Move legacy CRM",
  "startDate": "2025-08-01",
  "endDate": "2025-09-15",
  "requiredSkills": ["MongoDB", "Express"],
  "teamSize": 4,
  "status": "Planning"
}
```

---

### 🔹 Tasks

```http
POST /v1/create/tasks
```

```json
{
  "engineerId": "64f1...",
  "projectId": "64e2...",
  "allocationPercentage": 50,
  "startDate": "2025-08-01",
  "endDate": "2025-08-20"
}
```

---

## 🙌 Contributions & Help from ChatGPT (Since Aug 1, 2025)

This project was built with real-time support and advice from ChatGPT in the following ways:

* 🛠 Designed robust role-based Express backend with JWT authentication
* 🚀 Deployed backend to Vercel using `serverless-http`
* 💾 Defined Mongoose schemas for User, Project, Task models
* 🔐 Ensured correct access control for Manager vs Engineer
* 📊 Helped create dynamic dashboards with Recharts
* 📥 Designed modals, reusable context for login/signup/profile
* 🧪 Debugged 500 and token validation issues via `useFetch`
* 🔄 Added auto-refetching & loading states in custom hooks


---

## 📬 Contact

For feedback, questions, or collaboration:

📧 Email: abhiseksikdar40@gmail.com
🔗 LinkedIn: [Abhisek Sikdar](www.linkedin.com/in/abhisek-sikdar)

