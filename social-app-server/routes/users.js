const express =require('express');
const { getUser,deleteUser,follow,unfollow } = require('../handlers/users');
const router=express.Router({mergeParams:true});

router
     .route("/:id")
     .get(getUser)
     .delete(deleteUser)
router.put("/:id/:currentUserName",follow)
     .put("/:id/:currentUserName/unfollow",unfollow)

module.exports=router;