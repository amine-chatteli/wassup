const mongoose =require('mongoose');
const user =require('./user');


const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:160
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})
messageSchema.pre('remove',async function(next){
    try {
        let user =await User.findById(this.user); //find a user
        user.message.remove(this.id); // remove message id from his message list
        await user.save(); //save changes
    } catch (error) {
        return next(error)
    }
})
const Message=mongoose.model("message",messageSchema);
module.exports=Message;