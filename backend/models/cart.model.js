import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Product" ,
        required : true ,
    } ,
    quantity : {
        type : Number
    }
})

const Cart = mongoose.model("Cart",cartSchema);
export default Cart ;