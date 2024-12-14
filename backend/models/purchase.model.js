import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Product" ,
        required : true ,
    }
})

const Purchase = mongoose.model("Purchase",purchaseSchema);
export default Purchase ;