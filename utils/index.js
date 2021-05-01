const RandExp = require("randexp");
const nodeMailer = require("nodemailer")
const dotenv = require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');

const email  = process.env.email
const password = process.env.password
const s3 = new aws.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRET,
})


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

//setting filter to the files just pictures with that format
const fileFilter = (req, file, cb) => {
  if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
    cb(null, true)
  }else{
    cb(new Error("Wrong Format"), false)
  }
}

const uploadFiles = multer({
  storage,
  limits:{
    fileSize:  1024 * 1024 * 20 //20mb max
  },
  fileFilter
})


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
    },
    maxConnections: 5,
  })

  let mailOption = {
    from:"Shopin-api Services",
    to,
    subject,
    text
  }

  try {
    await transporter.sendMail(mailOption)    
  } catch (error) {
    console.log(error)
  }
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
  mailSender,
  uploadFiles
};



// const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.BUCKET,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function(req, file, cb){
//       cb(null, Date.now().toString())
//     },
//     acl: "public-read"
//   })
// })