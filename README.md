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
npm install nodemon

3. Create .env file
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
SECRET_KEY=your_secret_key

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


---



🔑 API Endpoints
Register as User(IMPORTANT to dicover secret key) to discover secretkey
Method: POST
URL:
https://gdg-85v5.onrender.com/api/auth/register
Body (JSON):
{
  "username": "google",
  "email": "google@example.com",
  "password": "google",
  "role": "user"
}

Login as User
Method: POST

URL:
https://gdg-85v5.onrender.com/api/auth/login

Body (JSON):
{
  "username": "google",
  "password": "google"
}

Response:
{
  "success": true,
  "message": "Logged in successfully",
  "accessToken": "some random token"
}

🧪 Testing Authentication
🔹 Option 1: Postman (Bearer Token)
In Postman, open the Authorization tab

Select Bearer Token

Paste the copied accessToken

Send request → You’ll receive an HTML response


🔹 Option 2: Browser (RECOMMENDED for Clues)
Go to:
First check the video accurately and try testing  using postman or go according to the video in browser

Demo Video Link :https://drive.google.com/file/d/1yuCwoqmTlNuu2t87gPWc75bxOFLnL0R1/view?usp=sharing

## 🚀 Live Demo
🔗 [Click here to test](https://gdg-85v5.onrender.com) 
When opened, you’ll see:
working


https://gdg-85v5.onrender.com/api/home/welcome
Open DevTools → Application → Cookies

The cookies are Generating in postman but in browser for now follow this :
========Add a new cookie(IMPORTANT)==========:

Name: accessToken (name as it is)

Value: <paste your JWT token>

Domain: https://gdg-85v5.onrender.com

Expires : 25 Sep 2025 12:00:00 GMT (just copy this and paste there as shown in the demo video)

Path: /

Check ✅ httpOnly and ✅ Secure

Refresh the page → You’ll be redirected to the User Home Page

🕵️ Secret Key Discovery (Clues for Users)
⚠️ Spoiler Alert: The following section reveals the secret key discovery path.

Clue 1: Inspect the HTML code of the user page → Comment reveals next path:

/welcome/crack
Clue 2: Scan the QR code (Google Lens) → Next path:

/welcome/crack/secret
Clue 3: Open DevTools → Application → Cookies → Next path:

/welcome/crack/secret/Parle-G
Clue 4: 🎉 First fragment of secret key found!

Continue: Status 418 (I’m a teapot) → Check HTML title → Next path:

/welcome/crack/secret/Parle-G/teapot
Clue 5: Open Console (Ctrl+Shift+J) → You’ll see:
Second fragment of secret key
Next path:
/welcome/crack/secret/Parle-G/teapot/finalsecret
Final Clue: Visit the final page → You’ll see the full secret key 🎯

🎯 Access Rules Recap
Admin (role: "admin") → Direct access to secret key

User (role: "user") → Must follow clues to discover the secret key


👨‍💻 Author
Developed by Bangaru Sai Ganesh 🚀
saiganesh.b24@iiits.in
B.Tech CSE @ IIIT Sri City
