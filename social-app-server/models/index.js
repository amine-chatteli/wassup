const mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=Promise;
mongoose.connect('mongodb://localhost/social-app',{
    keepAlive:true,
    useMongoClient:true
})