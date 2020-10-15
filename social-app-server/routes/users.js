const express =require('express');
const { getUser } = require('../handlers/users');
const router=express.Router({mergeParams:true});

router
     .route("/:id")
     .get(getUser);


module.exports=router;