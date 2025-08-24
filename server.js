require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDB = require("./database/db.js");

const authRoutes = require('./routes/auth-routes.js');
const homeRoutes = require("./routes/home-routes.js");
const adminRoutes = require("./routes/admin-routes.js");


connectToDB();

const app = express();

const PORT = process.env.PORT || 3000; // PORT  from .env file or by default port 3000

app.use(express.json());
/*
app.use(express.json()); is middleware that lets your Express app automatically parse incoming JSON request bodies into JavaScript objects so you can access them with req.body. ✅
*/
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.json({
        message : "working"
    })
})
app.use('/api/auth', authRoutes);
app.use("/api/home",homeRoutes);
app.use("/api/admin",adminRoutes);



app.listen(PORT, () => {
    console.log(`Server is now listening to the port ${PORT}`);
})
