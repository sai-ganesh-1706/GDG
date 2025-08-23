const express = require('express');
const {registerUser, loginUser} = require('../controllers/auth-controller.js')
const router = express.Router();
console.log("registerUser type:", typeof registerUser);
console.log("loginUser type:", typeof loginUser);
// all routes are related to authentication and authorization
router.post('/register', registerUser);
router.post('/login',loginUser);



module.exports = router;