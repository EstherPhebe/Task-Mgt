const express = require("express");
const db = require("../database/models");
const auth = require("../middleware/auth");

const { user, task } = db.sequelize.models;

const router = express.Router();

// Create Task
router.post("/tasks", auth, async (req, res) => {
  const { title, description, due_by, status, priority } = req.body;
  try {
    const newTask = await task.create({
      title,
      description,
      due_by,
      priority,
      status,
      user_id: req.user_id,
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Unable to create task" });
  }
});

// Get all tasks for a User
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await task.findAll({ where: { user_id: req.user_id } });
    console.log(tasks[0].dataValues);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get all tasks sorted by date
router.get("/tasks/s/date", auth, async (req, res) => {
  try {
    const tasks = await task.findAll({
      order: [["due_by", "ASC"]],
      where: { user_id: req.user_id },
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get single task
router.get("/tasks/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const singleTask = await task.findOne({ where: { id: id } });
    if (req.user_id !== singleTask.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(singleTask);
  } catch (err) {
    res.status(400).json({ err: "Task not found" });
  }
});

//Get all tasks by priority - Has to be redone because ENUM was removed from DB Model
// router.get("/tasks/s/:priority", auth, async (req, res) => {
//   const { priority } = req.params;
//   try {
//     const tasks = await task.findAll({
//       where: { user_id: req.user_id, priority: priority },
//     });
//     res.json(tasks);
//   } catch (err) {
//     res.status(400).json({ error: "Unable to get tasks" });
//   }
// });

//Update a task
router.patch("/tasks/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, due_by, status, priority } = req.body;
  try {
    const task = await task.findOne({
      where: { taskId: id, userId: req.userId },
    });
    (task.title = title || task.title),
      (task.description = description || task.description),
      (task.due_by = due_by || task.due_by),
      (task.priority = priority || task.priority),
      (task.status = status || task.status),
      res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Unable to edit task" });
  }
});

//Delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await task.findOne({ where: { id: id } });
    if (req.user_id !== task.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await deleteTask.destroy();
    res.json({ note: "Task deleted" });
  } catch (err) {
    res.status(400).json({ err: "Task not found" });
  }
});
//

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/alltask", async (req, res) => {
  const all = await Task.findAll();
  res.json(all);
});

module.exports = router;
