//importing necessary modules
const express = require('express');
const indexRoutes = require('./routes/index');
const mongodb = require('./models/data/db.js');
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

app.use('/api', indexRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Mater Dei Api is running</h1>");
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});