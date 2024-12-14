import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    rating : {
        type : Number,
        required : true
    } ,
    review : {
        type : String ,
        required : true
    }
},{timestamps : true});

const Rating = mongoose.model("Rating",ratingSchema);
export default Rating ;