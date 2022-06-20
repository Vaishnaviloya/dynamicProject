const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        required: true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Inavlid email")
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        min : 10
    },
    message : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
})

//we need to create collection

const User = mongoose.model("User" , userSchema)


module.exports = User