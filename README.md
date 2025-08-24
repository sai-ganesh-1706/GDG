# 🔐 Secure Authentication System with JWT & Conditional Access

A backend authentication system built with **Node.js, Express, and MongoDB** featuring **JWT-based authentication**, secure cookie management, and conditional access mechanisms for protected resources.  
Deployed on **Render** for production use and tested via **Postman**.

---

## 📌 Project Overview

The project implements a **secure authentication and discovery process**:
- **User Registration & Login** with password hashing
- **JWT Authentication** (access & refresh tokens)
- **Protected Routes** accessible only with valid tokens
- **Conditional Secret Discovery Flow** (multi-step process before revealing secret key)
- **Bonus**: Secure cookie-based session handling
- **Deployment** on Render with environment-based configuration

---

## 🏗️ Technical Architecture

**Workflow Diagram**

```text
[ Client ] 
   |  (register/login)
   v
[ Express API ] --(JWT issuance)--> [ MongoDB (User Store) ]
   |  
   |---> Protected Routes (verify JWT / cookies)
   |---> Discovery Process (challenge → unlock → secret)
   v
[ Response with Protected Data / Secret Key ]

Node.js & Express → REST API server

MongoDB → User & session storage

JWT → Access control & claims (roles, scopes, secret access)

Cookies (HttpOnly, Secure) → Token storage for session handling

Postman → API testing

Render → Deployment environment

⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/your-username/secure-auth-system.git
cd secure-auth-system

2. Install dependencies
npm install

3. Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
REFRESH_SECRET=your_refresh_secret_key

4. Run server (development)
npm run dev

5. Test via Postman

Import the Postman collection (if provided)

Endpoints:

POST /api/auth/register

POST /api/auth/login

GET /api/home/welcome

GET /api/admin/welcome

6. Deployment on Render

Push your code to GitHub

Connect repo to Render

Add environment variables from .env in Render dashboard

Deploy!




🛠️ Technology Stack

Backend Framework: Node.js + Express

Database: MongoDB (Mongoose)

Authentication: JWT (Access & Refresh Tokens)

Session Handling: Secure Cookies (HttpOnly, Secure, SameSite)

API Testing: Postman

Deployment: Render

🚀 Future Enhancements

📱 Create a frontend UI to consume this backend

📊 Add request logging and monitoring (Winston / Morgan + Prometheus)

🕸️ Add GraphQL or gRPC layer for advanced clients

🔄 Full token rotation and revocation system


👨‍💻 Author

Bangaru Sai Ganesh

saiganesh.b24@iiits.in

B.Tech CSE @ IIIT Sri City
