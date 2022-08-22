//importing necessary modules
const express = require('express');
const staffRoute = require('./routes/staffRoute');
const adminRoute = require('./routes/adminRoute');
const soccerTeamRoute = require("./routes/socccerTeamRoutes")
const mongodb = require('./utils/db.js');
const app = express();
const PORT = process.env.PORT ||1234
const cors = require('cors');
const session = require("express-session")

require('dotenv').config();

//Calling the neccesary middlewares
app.use(cors());
app.use(express.json());
app.use('/',express.static('public'));
app.use(session({ secret: process.env.SESSION_SECRET }))

//Starting the database connection
mongodb();

app.use('/staff', staffRoute);
app.use('/admin', adminRoute);
app.use("/soccer_team", soccerTeamRoute)

// app.use('/student', studentRoute);

app.get('/', (req, res) => {
    res.send("<h1>Mater Dei Api is running</h1>");
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});