const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const todoModel = require("../models/todoModel");

// Create todo
exports.createTodo = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const user = req.user;
  if (!title || !description) {
    return next(new ErrorHandler("Please enter title or description"));
  }
  const todo = await todoModel.create({
    title,
    description,
    createdBy: user,
  });
  res.status(200).json({
    success: true,
    todo,
  });
});

// Fetch todo related to user
exports.fetchMyTodos = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const todos = await todoModel.find({ createdBy: user });
  res.status(200).json({
    success: true,
    todos,
  });
});

// Fetch todo by id
exports.getTodoById = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const todo = await todoModel.find({
    createdBy: user,
    _id: id,
  });
  if (!todo || todo.length === 0) {
    return next(new ErrorHandler("Todo Not Found", 404));
  }
  res.status(200).json({
    success: true,
    todo,
  });
});

// Update todo By Id
exports.updateTodoById = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const { title, description } = req.body;
  let todo = await todoModel.findOneAndUpdate(
    {
      createdBy: user,
      _id: id,
    },
    {
      title,
      description,
      updatedAt: Date.now(),
    }
  );
  todo = await todoModel.find({
    createdBy: user,
    _id: id,
  });
  if (!todo || todo.length === 0) {
    return next(new ErrorHandler("Todo Not Found", 404));
  }
  res.status(200).json({
    success: true,
    todo,
  });
});

// Delete Todo By Id
exports.deleteTodoById = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  let todo = await todoModel.findOneAndDelete({
    createdBy: user,
    _id: id,
  });
  if (!todo || todo.length === 0) {
    return next(new ErrorHandler("Todo Not Found", 404));
  }
  res.status(200).json({
    success: true,
    todo,
  });
});

// Delete all of my Todos
exports.deleteMyTodos = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const todos = await todoModel.deleteMany({
    createdBy: user,
  });
  res.status(200).json({
    success: true,
    todos,
  });
});

// Admin Only Functions
// Fetch all Todos
exports.getAllTodos = catchAsyncError(async (req, res, next) => {
  const todos = await todoModel.find();
  res.status(200).json({
    success: true,
    todos,
  });
});

// Delete Todo By Id
exports.deleteAnyTodoById = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let todo = await todoModel.findOneAndDelete({
    _id: id,
  });
  if (!todo || todo.length === 0) {
    return next(new ErrorHandler("Todo Not Found", 404));
  }
  res.status(200).json({
    success: true,
    todo,
  });
});

// Delete All Todos
exports.deleteAllTodos = catchAsyncError(async (req, res, next) => {
  const todos = await todoModel.deleteMany();
  res.status(200).json({
    success: true,
    todos,
  });
});
