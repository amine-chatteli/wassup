const mongoose =require('mongoose');
mongoose.set('debug',true);
mongoose.Promise=Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-app');
module.exports.User=require('./user')
module.exports.Message=require('./message')