const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/creategroup');
const userGroup = require('./models/usergroup');
const GroupMessage = require('./models/groupmessage');
const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/creategroup');
const contentRoutes = require('./routes/groupmessage');


app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/group', groupRoutes);
app.use('/content', contentRoutes);

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, {through: userGroup});
Group.belongsToMany(User, {through: userGroup});

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);


sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})