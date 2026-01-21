const express = require('express');
const mongoose = require('mongoose');
const { type } = require('os');
const path = require('path');
const app = express();

// 1. Database Connection
mongoose.connect('mongodb://localhost:27017/AuthDB')
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

// 2. User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    pass: String
});

const User = mongoose.model('User', userSchema);

// 3. Middlewares
app.use(express.urlencoded({ extended: true }));

// 4. ROUTES
app.get('/', (req, res) => {
    res.sendFile("login.html", { root: __dirname })
});

app.get('/register', (req, res) => {
    res.sendFile("register.html", { root: __dirname })
});

// 5. POST ROUTES
app.post('/signin', async (req, res) => {
    const checkUser = await User.findOne({
        name: req.body.username,
        pass: req.body.password
    })

    if (checkUser) {
        res.sendFile("success.html", { root: __dirname })
    } else {
        res.sendFile("Wrong-Login.html", { root: __dirname })
    }
});

app.post('/signup', async (req, res) => {
    const existingUser = await User.findOne({ name: req.body.username });

    if (existingUser) {
        res.sendFile("Registration-Alert.html", { root: __dirname })
    } else {
        const newUser = new User({ name: req.body.username, pass: req.body.password });
        await newUser.save();
        res.sendFile("success.html", { root: __dirname })
    }
});

app.listen(3000, () => {
    console.log("Server on: http://localhost:3000")
});