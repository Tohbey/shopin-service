const RandExp = require("randexp");
const nodeMailer = require("nodemailer")
const dotenv = require('dotenv').config();

const email  = process.env.email
const password = process.env.password

GenerateToken = (num) => {
  var text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

GenerateOTP = (num) => {
  const OTPCode = new RandExp(`[0-9]{${num}}`).gen();

  return OTPCode;
};

const mailSender = async(to, subject, text) => {
  let transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:email,
        pass:password
    }
  })

  let mailOption = {
    from:"Shopin-api Services",
    to,
    subject,
    text
  }

  await transporter.sendMail(mailOption)
}

const paginate = (req) => {
  const page =
    typeof req.query.page !== "undefined" ? Math.abs(req.query.page) : 1;
  const pageSize =
    typeof req.query.pageSize !== "undefined"
      ? Math.abs(req.query.pageSize)
      : 50;
  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip };
};


module.exports = {
  paginate,
  GenerateOTP,
  GenerateToken,
  mailSender
};
