const mongoose =require('mongoose');
const User =require('./user');


const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:160
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
messageSchema.pre('remove',async function(next){
    try {
        let user =await User.findById(this.userId);
        user.message.remove(this.id);
        await user.save();
    } catch (error) {
        return next(error)
    }
})
const Message=mongoose.model("Message",messageSchema);
module.exports=Message;