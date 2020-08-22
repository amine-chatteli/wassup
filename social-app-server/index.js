require('dotenv').config();
const  express =require('express');
const app=express();
const cors=require('cors');
const bodyParser = require('body-parser');
const errorHandler=require('./handlers/error');
const authRoutes=require('./routes/auth');
const messagesRoutes=require('./routes/messages');
const {loginRequired,ensureCorrectUser}=require("./middleware/auth");
const db = require('./models');

const PORT=8080;
app.use(cors());                            
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use('/api/auth',authRoutes);   //prefix for sign in and signup functions
app.use('/api/users/:id/messages', //prefix for messages CRUD
loginRequired,     //middleware
ensureCorrectUser,
messagesRoutes); 

//display messages sorted by date of creation
app.get("/api/messages",loginRequired, async function(req,res,next){
    try {
        console.log(db.message);
       let messages=await db.Message.find().sort({createdAt:"desc"})
       .populate("user",{
           username:true,
           profileImageUrl:true
       });
       return res.status(200).json(messages);
    } catch (error) {
        return next(error)
    }
})
app.get("/api/users",loginRequired, async function(req,res,next){
    try {
       let users=await db.User.find()
       .populate("Message",{
           text:true
       });
       return res.status(200).json(users);
    } catch (error) {
        return next(error)
    }
})
app.use(function(req,res,next){
    let err =new Error('Not found');
    err.status =404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT,function(){
    console.log(`server is starting on port ${PORT}`);
    
})


