require("dotenv").config();
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware.js');

router.get('/welcome',authMiddleware,(req,res) => {
    const {username, userId, role} = req.userInfo;

    res.json({
        message : "welcome to the home page! to discover secret key continue to /welcome/crack",
        user : {
            _id : userId,
            username,
            role
        }
    })
});

// Step 1 → (auth required)
router.get("/welcome/crack", authMiddleware, (req, res) => {
  res.set("X-Next-Path", "/secret"); // beginner clue: header
  res.json({
    message: "Welcome developer 👩‍💻",
    hint: "Answer always does'nt lie in the Body"
  });
});

// Step 2 → (cookie clue)
router.get("/welcome/crack/secret", (req, res) => {
  res.cookie("NextPath", "Parle-G");
  res.json({
    message: `Nice Start👏`,
    hint: "Biscuits are Tasty🍪"
  });
});

// Step 3 → (non-200 clue)
router.get("/welcome/crack/secret/Parle-G", (req, res) => {
  res.status(418).json({
    fragment: "secret_part_1:shh_dont_tell_anyone_the_secret_key_is_",
    hint: "Notice the 418 status code. Not all APIs return 200 😉"
  });
});

// Step 4 → /clue_teapot (HTML metadata clue)
router.get("/welcome/crack/secret/Parle-G/teapot", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>secret_part_2:GDG{devs_never_sleep}, go to /final-secret</title>
        <meta name="hint" content="Check the page source 👀" />
      </head>
      <body>
        <h2>Good job 🚀</h2>
        <p>Backend devs peek at the HTML too!</p>
      </body>
    </html>
  `);
});

// Step 5 → /final-secret (full flag)
router.get("/welcome/crack/secret/Parle-G/teapot/final-secret", (req, res) => {
  const finalSecret = process.env.SECRET_KEY;
  res.json({
    SecretKey: finalSecret,
    message: "Congrats 🎉 You followed the developer trail like a pro!"
  });
});




module.exports = router;
