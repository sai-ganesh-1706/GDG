require("dotenv").config();
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware.js');

// Step 1 (HTML comment clue)
router.get("/welcome", authMiddleware, (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Step 1</title>
        <meta name="hint" content="Not everything visible is everything shown 👀" />
      </head>
      <body>
        <h2>Welcome ${req.userInfo.username} 🎉You’re authenticated! </h2>
        <p>The next clue is invisible at first sight...Inspect it carefully🧐</p>
        <!-- Hidden Clue:next path is /welcome/crack -->
      </body>
    </html>
  `);
});

// Step 2 (QR image)
router.get("/welcome/crack", authMiddleware, (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Step 2</title>
      </head>
      <body>
        <h2>Nice job 🚀</h2>
        <p>But the next clue isn’t written here… 👀</p>
        <img src="./qr.png" alt="Secret clue" />
      </body>
    </html>
  `);
});

// Step 3 (Cookie clue)
router.get("/welcome/crack/secret", authMiddleware, (req, res) => {
  res.cookie("NextPath", "Parle-G");
  res.send(`
    <html>
      <head>
        <title>Step 3</title>
        <meta name="hint" content="Sometimes answers hide in cookies 🍪" />
      </head>
      <body>
        <h2>Good progress 👏</h2>
        <p>You’re moving forward... Mmm Cookies are Tasty😋</p>
      </body>
    </html>
  `);
});

// Step 4 (Teapot clue)
router.get("/welcome/crack/secret/Parle-G", (req, res) => {
  res.status(418).send(`
    <html>
      <head>
        <title>Nextpath is /teapot</title>
        <meta name="hint" content="HTTP 418 – I’m a teapot 🍵" />
      </head>
      <body>
        <h2>status : 418</h2>
        <p>This is not a normal status... the clue is in the title ⬆️</p>
        <h3>secret_part_1:<strong>shh_dont_tell_anyone_the_secret_key_is_<strong><h3>
        
      </body>
    </html>
  `);
});

// Step 5 (Console logs)
router.get("/welcome/crack/secret/Parle-G/teapot", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Step 5</title>
        <meta name="hint" content="Open the browser console (F12 → Console) 👀" />
        <script>
          console.log("secret_part_2:GDG{devs_never_sleep}");
          console.log("Next Path: /welcome/crack/secret/Parle-G/teapot/final-secret");
        </script>
      </head>
      <body>
        <h2>Almost there! 🔑</h2>
        <p>Backend devs don’t just view source... they check the console too 😏</p>
      </body>
    </html>
  `);
});

// Final Secret
router.get("/welcome/crack/secret/Parle-G/teapot/final-secret", (req, res) => {
  const finalSecret = process.env.SECRET_KEY;
  res.send(`
    <html>
      <head>
        <title>Final Secret 🎉</title>
        <meta name="hint" content="You reached the end 🎯" />
      </head>
      <body>
        <h2>Congrats ${req.userInfo.username}🎊</h2>
        <p>Secret Key: <b>${finalSecret}</b></p>
        <p>You followed all the innovative developer trails 🚀</p>
      </body>
    </html>
  `);
});

module.exports = router;
