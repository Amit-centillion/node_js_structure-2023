const nodemailer = require("nodemailer");
const { ENV_CCONST } = require("../constants/envVariable");
const { sendMailDetail } = ENV_CCONST;

const { MESSAGE } = require("../constants/message");
const { USER } = MESSAGE;

const transporter = nodemailer.createTransport({
  host: sendMailDetail.host,
  port: sendMailDetail.port,
  secure: sendMailDetail.secure,
  auth: {
    user: sendMailDetail.auth.user,
    pass: sendMailDetail.auth.pass,
  },
});
const sendMail = (email, subject, html) => {
  var mailOptions = {
    from: sendMailDetail.from,
    to: email,
    subject: subject,
    text: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({
        message: USER.SOMTHING_WRONG,
        data: error,
      });
    } else {
      return res.status(200).json({
        message: USER.EMAIL_SEND_SUCCESSFULLY,
        data: data,
        emailData: info.response,
      });
    }
  });
};

module.exports = {
  sendMail,
};
