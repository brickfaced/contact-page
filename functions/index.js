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
    sendMeTheEmail(data.name, data.email, data.message);
    confirmationEmail(data.name, data.email);
    res.send(200);
  });
});

function sendMeTheEmail(name, email, message) {
  const mailOptions = {
    from: "sender@server.com",
    to: "je.mendoza@live.com"
  };

  mailOptions.subject = `Message from your Contact Form`;
  mailOptions.html = `<p><b>${name}</b></p>
                      <p><b>${email}</b></p>
                      <p><b>${message}</b></p>`;
  return mailTransport.sendMail(mailOptions);
}

function confirmationEmail(name, email) {
  const mailOptions = {
    from: "sender@server.com",
    to: email
  };

  mailOptions.subject = "Thanks for contacting us";
  mailOptions.html = `<p><b>Thank you for contacting us ${name}. We reach out to you ASAP.</b></p>`;
  return mailTransport.sendMail(mailOptions);
}
