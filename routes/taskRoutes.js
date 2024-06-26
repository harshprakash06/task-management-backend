const express = require('express');
const { addTask, deleteTask, fetchTasks , editTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/add', addTask);
router.delete('/delete/:taskId', deleteTask);
router.get('/', authMiddleware, fetchTasks);
router.put('/edit/:taskId',editTask);
module.exports = router;
