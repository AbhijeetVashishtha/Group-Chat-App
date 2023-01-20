const Message = require('../models/message');

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