const express =require('express');
const { getUser,deleteUser,follow } = require('../handlers/users');
const router=express.Router({mergeParams:true});

router
     .route("/:id")
     .get(getUser)
     .delete(deleteUser)
router.put("/:id/:currentUserName",follow)


module.exports=router;