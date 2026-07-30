# 📝 Blog REST API

A secure and scalable Blog REST API built with **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary**.

This project provides complete authentication, authorization, user management, and blog management with image upload support.

---

# 🚀 Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Logout
- Logout From All Devices
- Authenticated User Login

## User Management
- Register User
- Update Profile
- Delete Profile
- Get All Users
- Role Based Access (User/Admin)

## Blog Management
- Create Blog
- Update Blog
- Delete Blog
- Get All Blogs
- Blog Image Upload
- Blog Category

## Security
- JWT Authentication
- Password Hashing using bcryptjs
- Joi Validation
- Centralized Error Handling
- Role-Based Authorization

## Image Upload
- Cloudinary Storage
- Multer
- Automatic WebP Conversion
- Image Resize

---

# 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### Validation
- Joi

### Image Upload
- Multer
- Cloudinary

### Environment
- dotenv

---

# 📁 Project Structure

```
BLOG/
│
├── config/
│   ├── DB.js
│   └── cloudinary.js
│
├── controller/
│   ├── blogController.js
│   └── userController.js
│
├── middleware/
│   ├── auth.js
│   ├── checkRole.js
│   ├── HttpError.js
│   ├── upload.js
│   └── validate.js
│
├── model/
│   ├── blogModel.js
│   └── userModel.js
│
├── router/
│   ├── adminRouter.js
│   ├── blogRouter.js
│   └── userRouter.js
│
├── validation/
│   ├── blogSchema.js
│   └── userSchema.js
│
├── .env
├── package.json
├── package-lock.json
└── server.js
```

---

# ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/yourusername/blog-api.git
```

Move into project

```bash
cd blog-api
```

Install Dependencies

```bash
npm install
```

Run Server

```bash
npm run dev
```

or

```bash
npm start
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 📌 API Endpoints

## User

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /user/add | Register User |
| POST | /user/login | Login |
| POST | /user/authLogin | Verify Login |
| GET | /user/allData | Get All Users |
| GET | /user/logoutUser | Logout |
| GET | /user/allLogout | Logout All Devices |
| PATCH | /user/update | Update User |
| DELETE | /user/delete | Delete User |

---

## Blog

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /blog/add | Add Blog |
| GET | /blog/allBlog | Get All Blogs |
| PATCH | /blog/update/:id | Update Blog |
| DELETE | /blog/delete/:id | Delete Blog |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | /admin/update/:id | Update Any User |
| DELETE | /admin/delete/:id | Delete Any User |

---

# 🔐 Authentication

Protected routes require:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📦 Packages Used

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs
- multer
- cloudinary
- multer-storage-cloudinary
- joi

---

# 📷 Image Upload

Images are uploaded using **Cloudinary**.

Supported Formats

- JPG
- JPEG
- PNG
- WEBP

Maximum File Size

```
5 MB
```

---

# 🛡️ Validation

Validation is implemented using **Joi**.

Validated fields include:

- Name
- Email
- Phone
- Password
- Address
- Blog Title
- Description
- Category

---

# 🔒 Role-Based Authorization

## User

- Create Blog
- Update Own Profile
- Delete Own Profile
- Read Blogs

## Admin

- Update Any User
- Delete Any User
- Full Access

---

# 📸 API Outputs

---

# 👤 User APIs

## Register User

<img width="700" alt="image" src="https://github.com/user-attachments/assets/da412cf1-267c-4ffa-817d-165f34f03278" />


---

## Login User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/deadc120-8a33-471e-8aab-5c8334d2bc3a" />


---

## Auth Login

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/d0c109b3-7697-4414-8cbf-a974d4c21eea" />


---

## Get All Users

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/41ad3e7a-4817-499b-82e9-5125833a6145" />


---

## Update User

<img width="700" alt="image" src="https://github.com/user-attachments/assets/ad2cbcd4-1d7d-40dd-8b4a-ef9f417f3967" />


---

## Delete User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/c3719cc3-7f5e-44aa-b6e6-a9873c1c0225" />


---

## Logout User

<img width="700" alt="image" src="https://github.com/user-attachments/assets/acb49a02-0ed6-48f7-9b2b-6d00cc712ec2" />


---

## Logout From All Devices

<img width="700" alt="image" src="https://github.com/user-attachments/assets/90e6f3fa-3d8b-4fb6-908b-dd4edfc82b7a" />

---

# 📝 Blog APIs

## Add Blog

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/2bc788bc-0655-4f67-b2e4-a755d35697a1" />

---

## Get All Blogs

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/fdd7f9e3-83b0-47fa-b998-7b6c6e7e8f8c" />

---

## Update Blog

<img width="700" alt="image" src="https://github.com/user-attachments/assets/2a30d869-e0c2-4a6a-b2ad-65aac6f45ff4" />

---

## Delete Blog

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/22893adf-c950-462e-a6c4-c21b2823b9e9" />

---

# 👑 Admin APIs

## Update User By Admin

<img width="992" height="672" alt="image" src="https://github.com/user-attachments/assets/fd8af89a-4c09-4da6-9874-e9d888583ee3" />

---

## Delete User By Admin

<img width="999" height="558" alt="image" src="https://github.com/user-attachments/assets/0c86b4de-f31e-40e4-a5e1-6e3332a9c8ea" />

---

# 👨‍💻 Author

**Kalpesh Goswami**

Full Stack MERN Developer

GitHub:
https://github.com/kalpeshgoswami

LinkedIn:
https://www.linkedin.com/in/kalpeshgoswami/

---

# ⭐ If you like this project

Give it a ⭐ on GitHub.
