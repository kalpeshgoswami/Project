# 🧑‍💼 Employee Attendance Management System

A secure **Employee Attendance Management REST API** built using **Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, and Role-Based Authorization**.

This project allows employees to register, log in securely, manage their profile, and enables administrators to manage employees and attendance records.

---

Render link : https://nodejs-practical-2zg5.onrender.com/employee/allEmp

video link : https://drive.google.com/file/d/1HBCQniP27-BM52q0G43iLgmp87BBZdYn/view?usp=drive_link

---

## 🚀 Features

### Authentication
- ✅ Employee Registration
- ✅ Employee Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Logout
- ✅ Logout from All Devices

### Employee Management
- ✅ Get Logged-in Employee
- ✅ Get All Employees
- ✅ Update Own Profile
- ✅ Delete Own Account

### Admin Features
- ✅ Update Any Employee
- ✅ Delete Any Employee
- ✅ Role-Based Authorization

### Attendance
- ✅ Mark Attendance
- ✅ View Today's Attendance
- ✅ Attendance Population using Mongoose

### Security
- ✅ Password Hashing using bcrypt
- ✅ JWT Token Authentication
- ✅ Error Handling Middleware
- ✅ Protected APIs

---

# 🛠 Tech Stack

| Technology | Used |
|------------|------|
| Node.js | ✅ |
| Express.js | ✅ |
| MongoDB | ✅ |
| Mongoose | ✅ |
| JWT | ✅ |
| bcryptjs | ✅ |
| dotenv | ✅ |
| Nodemon | ✅ |

---

# 📂 Project Structure

```
node.js_Practical
│
├── config
│   └── DB.js
│
├── Controller
│   ├── attendanceController.js
│   └── employeeController.js
│
├── middleware
│   ├── auth.js
│   ├── checkRole.js
│   └── HttpError.js
│
├── model
│   ├── attendanceModel.js
│   └── EmployeeModel.js
│
├── router
│   ├── adminRouter.js
│   ├── attendanceRouter.js
│   └── EmployeeRouter.js
│
├── screenshots
│   ├── home.png
│   ├── register.png
│   ├── login.png
│   ├── authlogin.png
│   ├── allEmployee.png
│   ├── update.png
│   ├── delete.png
│   ├── logout.png
│   ├── logoutAll.png
│   ├── markAttendance.png
│   ├── todayAttendance.png
│   ├── adminUpdate.png
│   └── adminDelete.png
│
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/kalpeshgoswami/node.js_Practical.git
```

Move to the project folder

```bash
cd node.js_Practical
```

Install dependencies

```bash
npm install
```

---

# ▶️ Run Project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Example

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/employeeAttendance

JWT_SECRET=KG
```

---

# 📌 API Endpoints

## Employee APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /employee/addEmployee | Register Employee |
| POST | /employee/login | Employee Login |
| POST | /employee/authlogin | Logged-in Employee |
| GET | /employee/allEmp | Get All Employees |
| PATCH | /employee/update | Update Own Profile |
| DELETE | /employee/delete | Delete Own Profile |
| GET | /employee/logout | Logout |
| GET | /employee/allLogout | Logout From All Devices |

---

## Attendance APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /attendance/mark | Mark Attendance |
| GET | /attendance/today | Today's Attendance |

---

## Admin APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | /admin/update/:id | Update Employee |
| DELETE | /admin/delete/:id | Delete Employee |

---

# 🔐 Authentication

All protected routes require a JWT token.

Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 👨‍💼 Employee Schema

```javascript
{
  name,
  address,
  phone,
  email,
  password,
  role,
  tokens
}
```

---

# 📅 Attendance Schema

```javascript
{
  EmpName,
  status,
  date,
  markedBy
}
```

---

# 📸 API Screenshots


## 👤 Register Employee

```http
POST /employee/addEmployee
```

<img width="1417" height="919" alt="image" src="https://github.com/user-attachments/assets/68554ae4-1cd4-43de-9759-ed8eb678c738" />


---

## 🔐 Employee Login

```http
POST /employee/login
```

<img width="1389" height="929" alt="image" src="https://github.com/user-attachments/assets/2a7bab13-dcaa-450a-a048-7edf7514c04b" />

---

## ✅ Auth Login

```http
POST /employee/authlogin
```

<img width="1433" height="919" alt="image" src="https://github.com/user-attachments/assets/143807c3-cb60-4962-a4c0-68cee5801e08" />


---

## 📋 Get All Employees

```http
GET /employee/allEmp
```

<img width="1321" height="950" alt="image" src="https://github.com/user-attachments/assets/1a00390b-e13e-4afa-bb97-45f7cf8a2fa3" />


---

## ✏️ Update Employee

```http
PATCH /employee/update
```

<img width="1406" height="926" alt="image" src="https://github.com/user-attachments/assets/1fecd759-d932-4ac4-aca6-fd0a57497dec" />


---

## ❌ Delete Employee

```http
DELETE /employee/delete
```

<img width="1272" height="755" alt="image" src="https://github.com/user-attachments/assets/11554a87-1bc1-4ab2-917e-73fbc2801384" />


---

## 🚪 Logout

```http
GET /employee/logout
```

<img width="1203" height="805" alt="image" src="https://github.com/user-attachments/assets/2985338e-9e50-464f-a407-917134f5f0bb" />


---

## 🌐 Logout From All Devices

```http
GET /employee/allLogout
```

<img width="1404" height="779" alt="image" src="https://github.com/user-attachments/assets/679f5b2d-5b31-4746-8e0f-15105f17cee6" />


---

## 📅 Mark Attendance

```http
POST /attendance/mark
```

<img width="1237" height="904" alt="image" src="https://github.com/user-attachments/assets/f5c6abbc-dc33-4dd3-b37c-c4d9ea67e776" />


---

## 📊 Today's Attendance

```http
GET /attendance/today
```

<img width="1147" height="890" alt="image" src="https://github.com/user-attachments/assets/97734474-15b8-49aa-aaa6-ede84cb0d6bd" />


---


# 📖 Example Login Response

```json
{
    "success": true,
    "message": "Employee logged in successfully",
    "employeelogin": {
        "_id": "688f......",
        "name": "Kalpesh",
        "email": "kalpesh@gmail.com",
        "role": "employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

# 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.7.1",
  "nodemon": "^3.1.14"
}
```

---

# 🔄 Application Flow

```
Employee Register
        │
        ▼
Employee Login
        │
        ▼
Generate JWT Token
        │
        ▼
Authenticate Request
        │
        ▼
Access Protected Routes
        │
        ▼
Logout
```

---

# 🔒 Authorization

### Employee

- Login
- View Profile
- Update Own Profile
- Delete Own Profile
- Logout
- Logout From All Devices

### Admin

- Update Any Employee
- Delete Any Employee
- Mark Attendance
- View Attendance
- Manage Employees

---

# 🚀 Future Improvements

- Employee Profile Image Upload
- Leave Management System
- Attendance History
- Monthly Attendance Report
- Search Employee
- Pagination
- Forgot Password
- Email Verification
- Refresh Token
- Swagger API Documentation
- Docker Support
- Unit Testing
- CI/CD Deployment

---

# 👨‍💻 Author

**Kalpesh Goswami**

### Connect with Me

- GitHub: https://github.com/kalpeshgoswami
- LinkedIn: https://linkedin.com/in/kalpeshgoswami

---

# ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub.

It helps others discover the project and motivates further improvements.

---

## 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and contribute.
