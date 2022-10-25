const express = require('express');
const router = express.Router();
const { createTodo, fetchMyTodos, getTodoById, updateTodoById, deleteTodoById, deleteMyTodos } = require('../controllers/todosController');
const { getAllTodos, deleteAllTodos, deleteAnyTodoById } = require('../controllers/todosController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// router.get("getTodos", getTodos);
router.post("/createTodo",isAuthenticatedUser, createTodo);
router.post("/getMyTodos",isAuthenticatedUser, fetchMyTodos);
router.post("/getTodo/:id",isAuthenticatedUser, getTodoById);
router.post("/updateTodo/:id",isAuthenticatedUser, updateTodoById);
router.post("/deleteTodo/:id",isAuthenticatedUser, deleteTodoById);
router.post("/deleteAllMyTodos",isAuthenticatedUser, deleteMyTodos);

// Admin Routes
router.get("/getAllTodos", isAuthenticatedUser,authorizeRoles('admin'), getAllTodos)
router.delete("/deleteAllTodos", isAuthenticatedUser,authorizeRoles('admin'), deleteAllTodos)
router.delete("/deleteAnyTodoById/:id", isAuthenticatedUser,authorizeRoles('admin'), deleteAnyTodoById)

module.exports = router;