// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/authMiddleware'); // Import your auth middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Apply authMiddleware selectively
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Routes that do not require authentication middleware
app.use('/auth', authRoutes); // Register and login routes

// Routes that require authentication middleware
app.use('/tasks', authMiddleware, taskRoutes); // Task-related routes

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
