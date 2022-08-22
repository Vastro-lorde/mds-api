//importing necessary modules
const express = require('express');
const staffRoute = require('./routes/staffRoute');
const adminRoute = require('./routes/adminRoute');
const soccerTeamRoute = require("./routes/socccerTeamRoutes")
const studentRoute = require("./routes/studentRoute")
const mongodb = require('./utils/db.js');
const app = express();
const PORT = process.env.PORT || 1234
const cors = require('cors');

require('dotenv').config();

//Calling the neccesary middlewares
app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));

//Starting the database connection
mongodb();

app.use('/api/staff', staffRoute);
app.use('/api/admin', adminRoute);
app.use("/api/soccerteam", soccerTeamRoute)
app.use('/api/student', studentRoute); 

app.get('/', (req, res) => {
    res.send("<h1>Mater Dei Api is running</h1>");
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});