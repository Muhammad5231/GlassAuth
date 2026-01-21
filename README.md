<div align="center">

# 🔐 Node.js & MongoDB Login System

![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v9.1.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**A complete, functional authentication system serving static HTML pages with a modern Glassmorphism UI.**

[How It Works](#-how-it-works) • [Installation](#-installation) • [Project Structure](#-project-structure) • [Contributing](#-future-improvements--contributing)

</div>

---

## 📖 Project Overview

This project is a fully functional **Login and Registration System** built from scratch using Node.js and Express as the backend and MongoDB as the database. It demonstrates the core logic behind web authentication, serving dynamic HTML pages based on user actions.

The frontend is designed with a premium **Glassmorphism** aesthetic, featuring blurred backgrounds, gradients, and smooth animations, providing a high-quality user experience.

---

## ✨ Current Features

This authentications system currently supports the following core operations:

### 1. User Registration (`/register`)
- Accepts a unique **Username** and **Password**.
- Checks the MongoDB database to ensure the username does not already exist.
- **Success:** Saves the user and redirects to the Success page.
- **Fail:** If the username exists, serves a dedicated `Registration-Alert.html` page warning the user.

### 2. User Login (`/`)
- Accepts credentials from the login form.
- Verifies the username and password against the stored database records.
- **Success:** Redirects to `success.html`.
- **Fail:** Redirects to `Wrong-Login.html` if the username doesn't exist or the password is incorrect.

### 3. Database Integration
- Uses **Mongoose** schemas to define the User model.
- Automatically handles database connections and duplicates (via unique constraints).

---

## 📸 Interface Preview

<div align="center">

| Login Screen | Registration Screen |
|:---:|:---:|
| *Glassmorphism Login Form* | *User Registration Form* |
| ![Login UI Placeholder](https://github.com/user-attachments/assets/da1151de-b0aa-4b53-a87a-6193f6f5419e) | ![Register UI Placeholder](https://github.com/user-attachments/assets/968d0aa9-caee-41c9-898a-4fbb28ad7346) |

</div>

---

## 🏗️ How It Works (Architecture)

The system follows a standard MVC (Model-View-Controller) pattern simplified for this project:

1.  **Client Request**: User submits a form (HTML).
2.  **Server (Express)**: Handles the POST request at `/signin` or `/signup`.
3.  **Database (MongoDB)**:
    *   **Signup**: Queries database to check for duplicates. If none, inserts new document.
    *   **Signin**: Queries database to match `{ name, pass }`.
4.  **Response**: Server sends a tailored HTML file (`sendFile`) back to the client based on the DB result.

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Muhammad5231/GlassAuth
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start MongoDB**
    Ensure your local MongoDB instance is running:
    ```bash
    mongod
    ```

4.  **Run the Server**
    ```bash
    node server.js
    ```

5.  **Access the App**
    Open your browser and go to: `http://localhost:3000`

---

## 📂 Project Structure

```
Login System/
├── server.js                # Main backend logic (Express App)
├── login.html               # Default Landing Page (Login)
├── register.html            # Registration Form
├── success.html             # Dashboard/Success Page
├── Wrong-Login.html         # Error page for bad credentials
├── Registration-Alert.html  # Error page for duplicate users
├── package.json             # Dependencies list
└── README.md                # Project Documentation
```

---

## 🔮 Future Improvements & Contributing (Code Ideas)

Want to contribute? Here are some implementation ideas with code snippets to get you started!

### 1. 🛡️ Secure Passwords with Bcrypt
**The Problem:** Passwords are currently plain text.
**The Fix:** Use `bcrypt` to hash passwords before saving.

```javascript
// npm install bcrypt
const bcrypt = require('bcrypt');

// Update the /signup route:
const hashedPassword = await bcrypt.hash(req.body.password, 10);
const newUser = new User({ 
    name: req.body.username, 
    pass: hashedPassword 
});
```

### 2. 🔑 Implement JWT for Sessions
**The Problem:** Users have to log in every time (stateless).
**The Fix:** Generate a token on login.

```javascript
// npm install jsonwebtoken
const jwt = require('jsonwebtoken');

// Update the /signin route:
if (passwordMatch) {
    const token = jwt.sign({ name: checkUser.name }, 'secretKey');
    res.cookie('token', token); // Send token to client
    res.redirect('/dashboard');
}
```

### 3. 📝 Input Validation
**The Problem:** Users can enter empty or weak passwords.
**The Fix:** Validate input before querying the DB.

```javascript
if (!req.body.username || req.body.password.length < 6) {
    return res.send("Password must be at least 6 chars long!");
}
```

### 4. 🎨 EJS for Dynamic Pages
**The Problem:** We use separate HTML files (`success.html`, `Wrong-Login.html`).
**The Fix:** Use EJS to render one page with different messages.

```javascript
// npm install ejs
app.set('view engine', 'ejs');

// Render with data
res.render('login', { error: "Invalid Username or Password" });
```

### 🖥️ Other Cool Ideas
*   **Logout Route:** Clear the cookie/session.
*   **Show/Hide Password:** Add a little JavaScript to the frontend inputs.
*   **Dark Mode Toggle:** Save the preference in local storage.

**Pull requests are welcome!** Let's make this project better together. 🚀

---

<div align="center">

**Created by Muhammad Vahora**

*Star this repo if you found it useful! ⭐*

</div>


