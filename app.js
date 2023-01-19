const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const bcrypt = require('bcrypt');

const User = require('./models/user');
const app = express();

const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})