const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { taskValidation, validate } = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Stats route (must be before /:id)
router.get('/stats', getTaskStats);

// Main CRUD routes
router.route('/')
  .get(getTasks)
  .post(taskValidation, validate, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskValidation, validate, updateTask)
  .delete(deleteTask);

module.exports = router;