const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signUp = async (req,res,next) => {
    try{
        const {name, email, number ,password} = req.body;
        if(!name || !email || !number || !password){
            req.status(400).json({message: 'Require all fields'});
        }
        const user = await User.findAll({where: {email}});
        if(user.length>0){
            res.status(404).json({message: 'User Already Exist'});
        }
        else{
            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err);
                await User.create({username: name, email, phoneNo: number, password:hash});
                res.status(200).json({message: 'User successfully created'});
            })
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}