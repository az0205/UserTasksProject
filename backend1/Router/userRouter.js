const express = require('express')
const router=express.Router()
const user=require("../Controller/userController")
const tryCatch=require('../Middleware/tryCatch')
const upload=require('../Middleware/upload')

router.route("/users")
.get(tryCatch(user.getAllUsers))

router.route("/user/:id")
.get(tryCatch(user.getUser))
.put(tryCatch(user.updateUser))
.delete(tryCatch(user.deleteUser))

router.route("/register")
.post(tryCatch(user.userRegister))

router.route("/login")
.post(tryCatch(user.userLogin))

module.exports=router;