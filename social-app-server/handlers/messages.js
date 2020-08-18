const db=require('../models');

//api/users/:id/messages
exports.createMessage=async function (req,res,next){
try {
    let message=await db.Message.create({ //creat a message in the db
        text:req.body.text,
        user:req.params.id
    });
    let foundUser =await db.User.findById(req.params.id); //find the logged in user and add message id to his messages list
    foundUser.messages.push(message.id);
    console.log(req.headers);
    await foundUser.save();
    let foundMessage =await db.Message.findById(message._id).populate("user",{ // use this to display the author of each message
        username:true,
        profileImageUrl:true,
        
    });
    return res.status(200).json(foundMessage);
} catch (error) {
    return next(error)
}
};
exports.getMessage=async function (req,res,next){
    try {  
       
            let message=await db.Message.findById(req.params.message_id);
            return res.status(200).json(message)
        
    } catch (error) {
        return next(error);
    }

};
exports.deleteMessage=async function (req,res,next){
try {
    let foundMessage=await db.Message.findById(req.params.message_id)
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
} catch (error) {
    return next(error);
}
};