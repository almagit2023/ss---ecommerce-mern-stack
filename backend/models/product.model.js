import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
    },
    image : { 
        type : String ,
        required : true
    },
    imageTwo : {
        type : String ,
    },
    imageThree : {
        type : String
    },
    imageFour : {
        type : String
    },
    description : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true 
    },
    stock : {
        type : Number ,
        required : true 
    },
    category : {
        type : String ,
        required : true 
    },
    targetedAudience : {
        type : String,
        required : true ,
        enum : ["Male","Female","Children","Others"] ,
        default : "Others"
    } ,
    isAvailable : {
        type : Boolean ,
        required : true 
    },
    supplier : {
        type : String ,
        required : true
    },
    warranty : {
        type : String,
        required : true
    },
    returnPolicy : {
        type : String,
        required : true
    },
    ratings : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Ratings"
    }] 
},{timestamps : true});

const Product = mongoose.model("Product",productSchema);

export default Product ;