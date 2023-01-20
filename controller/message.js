const Message = require('../models/message');
const {Op} = require('sequelize');

exports.sendMessage = async (req,res) => {
    try{
        const message = req.body.message;
        console.log(message);
        if(isValidMessage(message)){
            await req.user.createMessage({
                message: message,
            });
            res.status(200).json({message: 'Message saved to Database'});
        }
        else{
            throw new Error('Invalid message Typed');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong'});
    }
}


function isValidMessage(message){
    if(typeof message === 'string' && message.length > 0){
        return true;
    }
    else{
        return false;
    }
}


exports.fetchMessage = async (req,res) => {
    try{
        const lastMsgId = req.query.lastMsgId;
        console.log('Message ID in Backend', lastMsgId);
        const messages = await Message.findAll({where: {id: {[Op.gt]: lastMsgId}}});    // gt is greater Than and op is name of sequelize library
        res.status(200).json({message:messages});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"})
    }
}

