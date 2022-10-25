const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // const token = req.headers.cookie;
  // const token = req.cookies;
  // console.log(token)
  const token = req.body.token;

  if (!token || token === "null") {
    return next(new ErrorHandler("Please login to access this utility.", 404));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // Saving the info of logged in user
  req.user = await UserModel.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => async (req, res, next) => {
  // const user = req.user;
  // if (user.role !== "admin") {
  //   return next(
  //     new ErrorHandler(`Sorry, ${user.role} cannot access this utility.`, 401)
  //   );
  // }
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorHandler(
        `${req.user.role} is not Authorized for this resource`,
        401
      )
    );
  }
  next();
};
