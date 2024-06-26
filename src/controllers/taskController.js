const User = require('../models/userModel');

exports.addTask = async (req, res) => {
    try {
        const { name, deadline } = req.body;

        if (!req.user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const newTask = {
            name,
            deadline,
            isPending: true
        };

        req.user.tasks.push(newTask);
        await req.user.save();

        res.status(201).json({ message: 'Task added successfully', tasks: req.user.tasks });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        req.user.tasks = req.user.tasks.filter(task => task._id.toString() !== taskId);
        await req.user.save();

        res.status(200).json({ message: 'Task deleted successfully', tasks: req.user.tasks });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.fetchTasks = async (req, res) => {
    try {
        // Ensure req.user is populated by authMiddleware
        if (!req.user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Fetch tasks associated with the authenticated user
        const tasks = req.user.tasks;

        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.editTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { name, deadline, isPending } = req.body;

        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        if (!req.user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Find the task to edit
        const taskIndex = req.user.tasks.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task fields
        if (name) req.user.tasks[taskIndex].name = name;
        if (deadline) req.user.tasks[taskIndex].deadline = deadline;
        if (isPending !== undefined) req.user.tasks[taskIndex].isPending = isPending;

        // Save the updated user document
        await req.user.save();

        res.status(200).json({ message: 'Task updated successfully', tasks: req.user.tasks });
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
