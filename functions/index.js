const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.sendMeTheEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const data = req.body;
    sendMeTheEmail(data.name, data.email, data.subject, data.message);
    res.send(200);
  });
});

function sendMeTheEmail(name, email, message) {
  const mailOptions = {
    from: "sender@server.com",
    to: gmailEmail
  };

  mailOptions.subject = `Message from your Contact Form ${subject}`;
  mailOptions.text = `${name} ${email} ${message}`;
  return mailTransport.sendMail(mailOptions);
}
