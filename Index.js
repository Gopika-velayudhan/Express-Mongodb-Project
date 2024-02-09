require("dotenv").config()

const express = require("express")

const adminroute = require("./router/AdminRouter")


const app = express()

app.use(express.json())
app.use("/",adminroute)

const PORT = 3001;

app.listen(PORT,(err)=>{
    if(err){
        console.log(`error dected ${err} `);
    }
    console.log(`server listen  to port:${PORT}`);

})






