const express = require('express')
const router=express.Router()
const {tokenVerifyUser}=require('../utils/jwtToken')
const task=require("../Controller/taskController")
const tryCatch=require('../Middleware/tryCatch')

router.route("/tasks")
.post(tokenVerifyUser, tryCatch(task.createTask))
.get(tokenVerifyUser, tryCatch(task.getAllTasks))

router.route("/tasks/:id")
.get(tokenVerifyUser, tryCatch(task.getTask))
.put(tokenVerifyUser, tryCatch(task.updateTask))
.delete(tokenVerifyUser, tryCatch(task.deleteTask))

module.exports=router;