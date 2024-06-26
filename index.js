// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware'); // Import your auth middleware

dotenv.config();

const index = express();
const port = process.env.PORT || 3000;

// Middleware
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Root route for testing
index.get('/', (req, res) => {
    res.status(200).send('<h1> WELCOME TO TASK-MANAGEMENT BACKED HEHE</h1>');
});

// Routes that do not require authentication middleware
index.use('/auth', authRoutes); // Register and login routes

// Routes that require authentication middleware
index.use('/tasks', authMiddleware, taskRoutes); // Task-related routes

// Start server
index.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
