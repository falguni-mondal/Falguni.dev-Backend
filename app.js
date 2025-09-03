const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

require("dotenv").config();

app.use(
    cors({
        origin : ['http://localhost:5173', 'https://falguni.netlify.app'],
        credentials : true,
    })
);
app.use(express.json());

app.post("/contact", async (req, res) => {
  const {email, message} = req.body;
  res.status(200).json({
    message: "Running!!",
    data : {
      email, message
    }
  });
});

module.exports = app;