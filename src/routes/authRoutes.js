const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // No authentication middleware needed
router.post('/login', login); // No authentication middleware needed

module.exports = router;
