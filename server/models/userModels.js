const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['volunteer','admin'],
        required:true
    },
    active:{
        type:boolean,
        default:true
    },
    createdAt:{
            type:Date,
            default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});
module.exports=mongoose.model('User',userSchema);


