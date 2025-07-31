const express=require('express');
const mongoose=require("mongoose");
const cors = require("cors");
const app=express();
const port = 3000;
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json());
require('dotenv').config();

mongoose.connect("mongodb+srv://ashazasaf:gamestar505@cluster0.lvuelqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("mongodb  connected"))
    .catch((e) => console.log("error found", e))
app.listen(port,()=>{
  console.log(`Server is running on ${port}`)
})

const authUser=require('./Router/userRouter')
app.use('/api/auth',authUser)

const authTask=require('./Router/taskRouter')
app.use('/api',authTask)

