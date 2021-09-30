const express = require('express');
const staffRoute = require('./routes/staffRoute')
const mongodb = require('./utils/db.js');

require('dotenv').config();
const app = express();
app.use(express.json());

mongodb();

app.use('/staff', staffRoute);
// app.use('/student', studentRoute);

app.get('/', (req, res) => {
    res.send("<h1>Mater Dei Api is running</h1>");
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});