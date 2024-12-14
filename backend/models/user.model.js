import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required : true 
    },
    lastName : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        unique : true
    },
    image : { 
        type : String 
    },
    password : {
        type : String 
    },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    },
    cartItem : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Cart"
    }],
    purchases : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }]
},{timestamps : true});

const User = mongoose.model("User",userSchema);

export default User ;