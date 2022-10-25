const sendEmail = require("./sendEmail");
const otpModel = require("../models/otpModel");
const otpExpiresIn = 300000;

const sendOTP = async (email, res, next, statusCode) => {
  const otp = await getOTP();
  let savedOtp = await otpModel.findOne({ email });
  if (savedOtp) {
    savedOtp.otp = otp;
    savedOtp.save({ validateBeforeSave: false });
  } else {
    savedOtp = await otpModel.create({
      otp,
      email,
    });
  }
  return res.status(200).json({
    success: true,
    data: otp
  })
  // const message = `Your OTP is ${otp}`;
  // await sendEmail({
  //   email: email,
  //   subject: "Email verification.",
  //   message,
  // });
  // setTimeout(async () => {
  //   await savedOtp.deleteOne({ email });
  // }, otpExpiresIn);

  // res.status(statusCode).json({
  //   success: true,
  //   message: "We have sent you otp. Please check your mail box",
  // });
};

const getOTP = async () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  this.verificationOTP = OTP;
  this.verificationOTPExpire = Date.now() + 15 * 60 * 1000;
  return OTP;
};

module.exports = sendOTP;
