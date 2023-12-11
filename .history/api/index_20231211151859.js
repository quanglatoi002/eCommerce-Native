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
// add address
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        //find the user by the Userid
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //add the new address to the user's addresses array
        user.addresses.push(address);

        //save the updated user in te backend
        await user.save();

        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error addding address" });
    }
});

// get add
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
});

app.post("/orders", async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            totalPrice,
            shippingAddress,
            paymentMethod,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));

        //create a new Order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
});

app.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
            return res
                .status(404)
                .json({ message: "No orders found for this user" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});
