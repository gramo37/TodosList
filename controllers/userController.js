const catchAsyncError = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const { sendToken } = require("../utils/sendToken");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/sendEmail");
const sendOTP = require("../utils/verifyEmail");
const crypto = require("crypto");

// Register User
exports.signinUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // Check for the mail in users table
  let user = await userModel.findOne({email: email});
  if(user) {
    return next(new ErrorHandler("Email Already Exists. Please Login", 401))
  }
  // Check for the email in OTPs table
  const savedOtp = await otpModel.findOne({ email: email });
  if (!savedOtp) {
    return next(new ErrorHandler("Please verify your email first.", 401));
  }
  if (!savedOtp.isMailVerified) {
    return next(new ErrorHandler("Please verify your otp.", 401));
  }
  user = await userModel.create({
    name,
    email,
    password,
    role,
  });
  sendToken(user, res, 200);
});

// Send OTP for email Verification
exports.sendOTP = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  let user = await userModel.findOne({email: email});
  if(user) {
    return next(new ErrorHandler("Email Already Exists. Please Login", 401))
  }
  // Verify email by sending OTP
  sendOTP(email, res, next, 200);
});

// Verify sent OTP for email verification
exports.verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;
  let user = await userModel.findOne({email: email});
  if(user) {
    return next(new ErrorHandler("Email Already Exists. Please Login", 401))
  }
  if (!email || !otp) {
    return next(new ErrorHandler("Please Enter a Email or OTP", 404));
  }
  const savedOtp = await otpModel.findOne({ email: email });
  if (!savedOtp) {
    return next(
      new ErrorHandler("OTP expired or not generated. Please try again.", 404)
    );
  }
  const isCorrectOTP = await savedOtp.compareOTP(otp);
  if (isCorrectOTP) {
    savedOtp.isMailVerified = true;
    await savedOtp.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "OTP is verified",
    });
  } else {
    return next(new ErrorHandler("Wrong OTP entered.", 401));
  }
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // If email/password not entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter a Email or Password", 404));
  }
  const user = await userModel.findOne({ email }).select("+password");
  // If user of email not found
  if (!user) {
    return next(new ErrorHandler("Email not found. Please register.", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Please Enter correct Email or Password", 401)
    );
  }
  sendToken(user, res, 201); // Get and save token in cookie
});

// Send Verification Link
exports.sendVerificationLink = catchAsyncError(async (req, res, next) => {
  {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    // Get ResetPassword Token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
      data: resetToken
    })
    // const resetPasswordURL = `${process.env.FRONTEND_URL}/api/v1/reset/password/${resetToken}`;
    // const message = `Copy and paste this token in the reset Password option: \n\n${resetToken} \n\n Ignore if not requested.\n\n Need to copy paste because we are using netlify for hosting the website and it doesn't allow broken links.`;
    // try {
    //   await sendEmail({
    //     email: user.email,
    //     subject: "Password Recovery",
    //     message,
    //   });
    //   res.status(200).json({
    //     success: true,
    //     message: `Email sent successfully`,
    //   });
    // } catch (error) {
    //   user.resetPasswordToken = undefined;
    //   user.resetPasswordExpire = undefined;
    //   await user.save({ validateBeforeSave: false });

    //   return next(new ErrorHandler(error.message, 500));
    // }
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash of the provided token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  // Find the user with the given token
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid token or expired token", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords are not matching.", 404));
  }
  user.password = req.body.password; // Change the password
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, res, 200);
});
