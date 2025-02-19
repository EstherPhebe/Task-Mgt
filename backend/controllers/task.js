const db = require("../database/models");
const router = require("../routes/task");

const { user, task } = db.sequelize.models;

//Create Task
const createTask = async (req, res) => {
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
    res.status(400).json({ error: "Unable to create task" });
  }
};

//Get all User Tasks
const getAllTasks = async (req, res) => {
  const { status, priority } = req.query;
  try {
    let whereConditon = {};

    if (status || priority) {
      status && (whereConditon.status = status);
      priority && (whereConditon.priority = priority);
    }

    const tasks = await task.findAll({
      where: {
        user_id: req.user_id,
        ...whereConditon,
      },
      // order: order, (Come back to this when there is a need to sort by low - high for priority)
    });
    console.log({ ...whereConditon }, whereConditon);
    // console.log(tasks[0].dataValues); - Looping through the task object
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get all User Tasks by Date
const getTasksbyDate = async (req, res) => {
  try {
    const tasks = await task.findAll({
      order: [["due_by", "ASC"]],
      where: { user_id: req.user_id },
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get single Task
const getTask = async (req, res) => {
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
};

//Update a Task
const updateTask = async (req, res) => {
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
};

//Delete a Task
const deleteTask = async (req, res) => {
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
};

// router.get("/users", async (req, res) => {
//   const users = await User.findAll();
//   res.json(users);
// });

// router.get("/alltask", async (req, res) => {
//   const all = await Task.findAll();
//   res.json(all);
// });

module.exports = {
  createTask,
  getTask,
  getAllTasks,
  getTasksbyDate,
  updateTask,
  deleteTask,
};
