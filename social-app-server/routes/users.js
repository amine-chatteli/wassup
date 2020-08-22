const express =require('express');
const { getUser } = require('../handlers/users');
const router=express.Router({mergeParams:true});

router
     .route("/:user_id")
     .get(getUser);


module.exports=router;