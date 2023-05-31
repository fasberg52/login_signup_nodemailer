var nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a6bb5cd21862f5",
      pass: "2f86c0805e8780",
    },
  });

  const mailOption = {
    from: "taherian.1993@gmail.com",
    to: option.userEmail,
    subject: option.subject,
    html: option.html,
  };

  await transport.sendMail(mailOption);
};

module.exports = sendEmail;
