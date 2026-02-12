const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post('/send-message', upload.none(), async (req, res) => {
  try {
    const { email, fullname, message, type } = req.body;

    if (!email || !fullname || !message) {
      return res.json([{ status: 0, message: "All fields required" }]);
    }

    // Configure transporter (example using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "razakmahama.rm@gmail.com",
        pass: "smoiytjazssgghlr"
      }
    });

    await transporter.sendMail({
      from: `"Website Contact" <razakmahama.rm@gmail.com>`,
      to: "kriolay@gmail.com",
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${fullname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json([{ status: 1, message: "Message sent successfully" }]);

  } catch (error) {
    console.error(error);
    res.json([{ status: 0, message: "Failed to send message" }]);
  }
});

app.listen(3000, () => {
  console.log("Mail API running on port 3000");
});
