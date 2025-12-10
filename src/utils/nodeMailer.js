const nodemailer = require("nodemailer");
const config = require("../config");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.gmail_address,
    pass: config.app_password,
  },
});


const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `creatiVerse <${config.gmail_address}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

module.exports = { sendEmail };