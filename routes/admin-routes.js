const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware.js')

const router = express.Router();

router.get('/welcome', authMiddleware,adminMiddleware,(req, res) => {
    res.json({
        message : 'Welcome Admin ${req.userInfo.username}!. you have the access to secret key ! continue to /welcome/secretkey'
    })
})
router.get('/welcome/secretkey', authMiddleware,adminMiddleware,(req, res) => {
    res.json({
        message : 'Got you, But Admin is not always the answer'
    })
})
module.exports = router;