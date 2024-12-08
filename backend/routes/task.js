// Import express,define an express router fn, import the controller and create a new instance of router
const express = require("express");
const auth = require("../middleware/auth");

const {
  createTask,
  getAllTasks,
  getTask,
  getTasksbyDate,
  updateTask,
  deleteTask,
} = require("../controllers/task");

const router = express.Router();

//Create Task
router.post("/tasks", auth, createTask);
//Get all Tasks
router.get("/tasks", auth, getAllTasks);
//Get Single Task
router.get("/tasks/:id", auth, getTask);
//Get all Tasks by Date
router.get("/tasks/s/date", auth, getTasksbyDate);
//Update task
router.patch("/tasks/:id", auth, updateTask);
//Delete Task
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;
