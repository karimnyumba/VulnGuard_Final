require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.json());

// Optional API key middleware
function apiKeyMiddleware(req, res, next) {
  if (API_KEY) {
    const clientKey = req.header('X-API-KEY');
    if (!clientKey || clientKey !== API_KEY) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid API key' });
    }
  }
  next();
}

app.post('/send-email', apiKeyMiddleware, async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, error: 'Missing required fields: to, subject, text' });
  }

  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to create transporter', details: err.message });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send email', details: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Mail Relay Service listening on port ${PORT}`);
}); 