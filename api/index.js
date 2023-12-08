const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const User = require("./models/user");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.listen(port, () => {
    console.log("Server is running on port 8000");
});

mongoose
    .connect(
        "mongodb+srv://1924801030061:cfnqQ7d73BKYBxmv@cluster0.ph3dvii.mongodb.net/"
    )
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDb", err);
    });

const sendVerificationEmail = async (email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    console.log(transporter);

    // nd gửi email
    const mailOptions = {
        from: "Công ty VQ",
        to: email,
        subject: "Email Verification",
        text: `Pls click verify your email: http://localhost:8000/verify/${verificationToken}`,
    };

    //send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

// register
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        // đã tồn tại
        if (existingUser) {
            console.log("Email already registered:", email);
            return res
                .status(400)
                .json({ message: "Email already registered" });
        }

        const newUser = await User.create({ name, email, password });

        //verify
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save db
        newUser.save();

        //gửi verification email -> user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
    }
});

// get when user onclick
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        console.log(token);
        //Find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Invalid verification token" });
        }

        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verification Failed" });
    }
});

// mã hóa key
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();

//login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        //token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});
