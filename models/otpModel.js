const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  otp: {
      type: String,
      unique: [true, "Please try again"],
      required: [true, "Please enter OTP"],
      length: [6, "Please enter 6 digit OTP"]
  },
  isMailVerified: {
      type: Boolean,
      default: false
  }
});

otpSchema.pre("save", async function (next) {
  // If otp is not modified then go to the next lines of code (Prevent hash of hashed password)
  if (!this.isModified("otp")) {
    next();
  }
  // If Password is modified again hash it
  this.otp = await bcrypt.hash(this.otp, 10);
});

otpSchema.methods.compareOTP = async function(otp)  {
  return await bcrypt.compare(otp, this.otp);
}

const otpModel = new mongoose.model("otp", otpSchema);

module.exports = otpModel;
