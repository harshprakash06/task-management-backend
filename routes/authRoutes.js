const express = require('express');
const { register, login,deleteUser } = require('../controllers/authController');
const authMiddleware  = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register); // No authentication middleware needed
router.post('/login', login); // No authentication middleware needed
router.delete('/delete/:userId', authMiddleware, deleteUser);
module.exports = router;
