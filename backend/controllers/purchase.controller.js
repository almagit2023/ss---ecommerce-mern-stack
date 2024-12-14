import Purchase from "../models/purchase.model.js"

export const fetchAllPurchases = async(req,res)=>{
    try {
        const purchases = await Purchase.find({}).populate("product");
        return res.status(200).json({
            success : true ,
            purchases
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching Purchases"
        })
    }
}