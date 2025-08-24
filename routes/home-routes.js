require("dotenv").config();
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware.js');

// Step 1
router.get('/welcome', authMiddleware, (req, res) => {
  const { username } = req.userInfo;

  res.set("X-Next-Path", "/welcome/crack"); // set BEFORE send
  res.send(`
    <html>
      <head>
        <title>Welcome Page</title>
        <meta name="hint" content="Developers should check headers too 😉" />
      </head>
      <body>
        <h2>Welcome ${username} 🎉</h2>
        <p>You’re authenticated! Inspect the response headers for your next clue 🔍</p>
      </body>
    </html>
  `);
});

// Step 2
router.get("/welcome/crack", authMiddleware, (req, res) => {
  res.cookie("NextPath", "/welcome/crack/secret");
  res.send(`
    <html>
      <head>
        <title>Step 2</title>
        <meta name="hint" content="Sometimes answers hide in cookies 🍪" />
      </head>
      <body>
        <h2>Nice job 🚀</h2>
        <p>You’re moving forward... but check your cookies this time!</p>
      </body>
    </html>
  `);
});
// Step 3
router.get("/welcome/crack/secret", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Step 3</title>
        <meta name="hint" content="Not everything visible is everything shown 👀" />
      </head>
      <body>
        <h2>Good progress 👏</h2>
        <p>The next clue is invisible at first sight...</p>
        <!-- Hidden Clue: /welcome/crack/secret/Parle-G -->
      </body>
    </html>
  `);
});

// Step 4
router.get("/welcome/crack/secret/Parle-G", (req, res) => {
  res.status(418).send(`
    <html>
      <head>
        <title>secret_part_1:shh_dont_tell_anyone_the_secret_key_is_</title>
        <meta name="hint" content="HTTP 418 – I’m a teapot 🍵" />
      </head>
      <body>
        <h2>You hit the teapot 🤖</h2>
        <p>This is not a normal status... the clue is in the title ⬆️</p>
      </body>
    </html>
  `);
});

// Step 5
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
        <h2>Congrats 🎊</h2>
        <p>Secret Key: <b>${finalSecret}</b></p>
        <p>You followed all the innovative developer trails 🚀</p>
      </body>
    </html>
  `);
});

module.exports = router;
