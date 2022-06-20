const mongoose =require("mongoose")


//creating a database
mongoose.connect("mongodb://localhost:27017/thapadynamic")
    .then(()=>{
        console.log("connection successful");
    }).catch((e)=>{
        console.log(e);
    })

