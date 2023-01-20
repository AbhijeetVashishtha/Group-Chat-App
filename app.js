const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');

const User = require('./models/user');
const Message = require('./models/message');
const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/message', messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})