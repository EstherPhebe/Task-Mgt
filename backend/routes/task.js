const express = require('express');
const db  = require('./../database/models');
const auth = require('./auth');

const { Task } = db.sequelize.models
const router = express.Router();

// Create Task
router.post('/tasks', auth, async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Tasks for a User
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});