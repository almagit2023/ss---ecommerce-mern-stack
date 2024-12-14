import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectToDB } from "./db/config.js";
import userRoute from "./routes/user.route.js"
import { cloudinaryConfig } from "./cloudinary/config.js";
import fileUpload from "express-fileupload";
import productRoute from "./routes/product.route.js"
import ratingRoute from "./routes/rating.route.js"
import cookieParser from "cookie-parser"
import paymentRoute from "./routes/payment.js"

import cors from "cors"
dotenv.config();
const PORT = process.env.PORT;

app.use(cors({
    origin : "*",
    credentials : true 
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

connectToDB();
cloudinaryConfig();


app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/ratings",ratingRoute);
app.use("/api/v1/payment",paymentRoute);



app.listen(PORT,()=>{
    console.log(`Server is Listening to Port ${PORT}`)
})