const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req,res, next) => {
    const token = req.header('Authorization');
        // console.log('?????????????????');
        // console.log(token);
        const user = jwt.verify(token,'mytoken');
        // console.log('///////////////////////');
        // console.log(user.userId);

        User.findByPk(user.userId)
        .then((user) => {
            // console.log(JSON.stringify(user));
            req.user=user;
            next();
        })
        .catch(err => console.log(err));  
}

module.exports = {
    authenticate
}