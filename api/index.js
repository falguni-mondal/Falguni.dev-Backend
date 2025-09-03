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

app.post("/api/contact", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Message are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "Mail from Portfolio",
      text: `${email} : ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message has been sent!" });
  } catch (err) {
    console.error(`Error : ${err}`);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message, Please try again later!",
        error: err
      });
  }

  
});

app.get("/" , (req, res) => {
  res.send("Hello Hero😎");
})

module.exports = app;