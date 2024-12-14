import Product from "../models/product.model.js";
import Rating from "../models/rating.model.js";

export const createRatings = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, rating, review } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    const newReview = await Rating.create({
      productId,
      rating,
      review,
      owner: userId,
    });
    await Product.findByIdAndUpdate(productId, {
      $push: { ratings: newReview._id },
    });
    return res.status(201).json({
        success : true ,
        message : "Rating Created Successfully",
        newReview
    })
  } catch (error) {
    return res.status(500).json({
        success : false ,
        message : "Something Went Wrong While Creating Ratings"
    })
  }
};
