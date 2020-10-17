const express =require('express');
const { getUser,deleteUser } = require('../handlers/users');
const router=express.Router({mergeParams:true});

router
     .route("/:id")
     .get(getUser)
     .delete(deleteUser);


module.exports=router;