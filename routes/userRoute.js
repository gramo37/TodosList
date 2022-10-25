const express = require('express');
const router = express.Router();
const {signinUser, loginUser, sendVerificationLink, resetPassword, sendOTP, verifyOTP} = require("../controllers/userController");

router.post('/auth/signin', signinUser);
router.post('/auth/login', loginUser);
router.post('/auth/send/link', sendVerificationLink);
router.post('/auth/reset/password/:resetToken', resetPassword);
router.post('/auth/sendOTP', sendOTP);
router.post('/auth/verifyOTP', verifyOTP)
// router.post('/auth/send/otp', loginUser) -- send different otps to mail and phone for verifying them

module.exports = router;