const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
