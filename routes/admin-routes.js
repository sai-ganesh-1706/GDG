const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware.js')

const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome Page</title>
      </head>
      <body>
        <h1>Welcome, Admin!</h1>
        <p>You have successfully accessed the admin page.you have access to secret key! To know secretkey continue to /welcome/secretkey</p>
      </body>
    </html>
  `);
});
router.get('/welcome/secretkey', authMiddleware,adminMiddleware,(req, res) => {
    res.json({
        message : "secret key : shh_dont_tell_anyone_the_secret_key_is_GDG{devs_never_sleep}"
    })
})
module.exports = router;