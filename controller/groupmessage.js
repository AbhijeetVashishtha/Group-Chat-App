const UserGroup = require('../models/usergroup');
const User = require('../models/user');
const Group = require('../models/creategroup');
const GroupMessage = require('../models/groupmessage');

exports.addParticipation = async (req,res) => {
    try{
        let {email, admin} = req.body;
        let gid = req.params.id;
        let userID = req.user.id;
        console.log(userID, gid);
        let isadmin = await UserGroup.findOne({where:{userId:userID, groupnameId: gid}});
        if(isadmin.admin === true){
            let checkUser = await User.findOne({where: {email:email}});
            if(checkUser){
                let groupData = await Group.findOne({where: {id:gid}});
                let grpName = groupData.groupname;
                let grpID = groupData.id;
                let uname = checkUser.username;
                const result = await UserGroup.create({admin: admin, groupname: grpName, name: uname, userId: checkUser.id, groupnameId: grpID});
                res.status(200).json({result,message: "User successfully added"});
            }
            else{
                res.status(404).json({message: "User Not Found with that Email"});
            }
        }
        else
        {
            res.status(401).json({message:"You are not Admin or Group Doesn't exist"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.sendGroupMessage = async (req,res) => {
    try{
        let groupid = req.params.id;
        let name = req.user.username;
        let userid = req.user.id;
        
        let {message} = req.body;
        console.log('user ID is',userid);

        let found = await UserGroup.findOne({where: {userId: userid, groupnameId: groupid}});
        if(found) {
            const result = await GroupMessage.create({message: message, username: name, groupid: groupid, userId:userid});
            res.status(200).json({result, message:"Message Successfully Send"});
        }
        else{
            throw new Error("Unable to Send Message");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong'});
    }
}

exports.getGrpMessages = async (req,res) => {
    try{
        let gid = req.params.id;
        let uId = req.user.id;
        let found = UserGroup.findOne({where: {userId: uId, groupnameId: gid}});
        if(found){
            const response = await GroupMessage.findAll({where: {groupid: gid}});
            res.status(200).json({data: response, message: 'Successfully got all the group message'});
        }
        else{
            res.status(404).json({message: 'You are not the member of the group'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}
