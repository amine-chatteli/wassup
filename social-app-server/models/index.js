const mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=Promise;
mongoose.connect('mongodb://localhost/social-app',{
    keepAlive:true,
    useMongoClient:true
})
module.exports.User=require('./user')
module.exports.Message=require('./message')