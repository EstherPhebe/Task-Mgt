const express = require("express");
const db = require("../database/models");
const auth = require("../middleware/auth");

const { tasks } = db.sequelize.models;
const { Statuses, Priorities } = require("../enum");

const router = express.Router();
const enumValue = Object.values;

// Create Task
router.post("/tasks", auth, async (req, res) => {
  const { title, description, due_by, status, priority } = req.body;
  try {
    const task = await tasks.create({
      title,
      description,
      due_by,
      priority,
      status,
      user_id: req.user_id,
    });
    res.status(201).json(task);
    console.log(`1st - ${req.body}`);
    // if (
    //   !enumValue(Statuses).includes(status) ||
    //   !enumValue(Priorities).includes(priority)
    // ) {
    //   res
    //     .status(400)
    //     .json({ error: "Invalid value selected: Unable to create task" });
    //   console.log(req.body);
    // } else {
    //   res.status(201).json(task);
    // }
  } catch (err) {
    console.log(req.body);
    res.status(400).json({ error: "Unable to create task" });
  }
});

// Get all tasks for a User
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await tasks.findAll({ where: { user_id: req.user_id } });
    //remove console statement -
    console.log(tasks[0].dataValues);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get all tasks sorted by date
router.get("/tasks/s/date", auth, async (req, res) => {
  try {
    const tasks = await tasks.findAll({
      order: [["due_by", "ASC"]],
      where: { user_id: req.user_id },
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get a single task
router.get("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasks.findOne({ where: { id: id } });
    // console.log(`${req.user_id} - ${task.user_id}`);
    if (req.user_id !== task.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ err: "Task not found" });
  }
});

//Get all tasks by priority
router.get("/tasks/s/:priority", auth, async (req, res) => {
  const { priority } = req.params;
  try {
    const tasks = await tasks.findAll({
      where: { user_id: req.user_id, priority: priority },
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: "Unable to get tasks" });
  }
});

//Update a task
router.patch("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, due_by, status, priority } = req.body;
  try {
    const task = await tasks.findOne({
      where: { taskId: id, user_id: req.user_id },
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
router.delete("/task/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasks.findOne({ where: { id: id } });
    if (req.user_id !== task.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await task.destroy();
    res.json({ note: "Task deleted" });
  } catch (err) {
    res.status(400).json({ err: "Task not found" });
  }
});
//

router.get("/users", async (req, res) => {
  const users = await users.findAll();
  res.json(users);
});

router.get("/alltask", async (req, res) => {
  const all = await tasks.findAll();
  res.json(all);
});

module.exports = router;
