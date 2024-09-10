const express = require('express');
const db  = require('./../database/models');
const auth = require('./auth');

const { Task  } = db.sequelize.models

const router = express.Router();

// Create Task
router.post('/tasks', auth, async (req, res) => {
  const { title, description, dueBy, status, priority } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueBy,
      priority,
      status,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Unable to create task' });
  }
});

// Get all tasks for a User
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    console.log(tasks[0].dataValues)
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get all tasks sorted by date
router.get('/tasks/s/date', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      order: [ ['dueBy', 'ASC'] ] ,
      where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get single task
router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params
  try{
    const task = await Task.findOne({ where: {  id: id }});
    console.log(`${req.userId} - ${task.userId}`)
    if (req.userId !== task.userId) {
      return res.status(401).json({ error: "Unauthorized"})
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ err: 'Task not found'});
  }
});

//Get all tasks by priority
router.get('/tasks/s/:priority', auth, async (req, res) => {
  const { priority } = req.params
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId, priority: priority}})
    res.json(tasks)
  } catch(err) {
    res.status(400).json({ error: 'Unable to get tasks' });
  }
});

//Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params
  const { title, description, dueBy, status, priority } = req.body;
  try {
    const task = await Task.findOne({ where: { taskId: id, userId: req.userId }});
    task.title = title || task.title,
    task.description = description || task.description,
    task.dueBy = dueBy || task.dueBy,
    task.priority = priority || task.priority,
    task.status = status || task.status,
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Unable to edit task' });
  }
});

//Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params
  try{
    const task = await Task.findOne({ where: { id: id }});
    if (req.userId !== task.userId) {
      return res.status(401).json({ error: "Unauthorized"})
    }
    await task.destroy()
    res.json({ note: 'Task deleted'});
  } catch (err) {
    res.status(400).json({ err: 'Task not found'});
  }
});
//

module.exports = router;