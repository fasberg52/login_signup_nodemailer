const nodemailer = require("nodemailer");

var sendEmail = (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "taherian.1993@gmail.com",
      pass: "yexxgwjrjxbitekf", // از پسوورد خودتون استفاده کنید
    },
  });
  const mailOptions = {
    from: "taherian.1993@gmail.com",
    to: option.userEmail,
    subject: option.subject,
    html: option.html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// var nodemailer = require("nodemailer");

// const sendEmail = async (option) => {
//
//   var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "a6bb5cd21862f5",
//       pass: "2f86c0805e8780",
//     },
//   });
//   console.log(`transport : ${transport}`);
//   const mailOption = {
//     from: "taherian.1993@gmail.com",
//     to: option.userEmail,
//     subject: option.subject,
//     html: option.html,
//   };

//   await transport.sendMail(mailOption);
//
// };

module.exports = sendEmail;
