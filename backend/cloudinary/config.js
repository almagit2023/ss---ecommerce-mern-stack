import { v2 as cloudinary } from 'cloudinary';


export const cloudinaryConfig = ()=>{
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY , 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Cloudinary Connected")
    } catch (error) {
        console.log(`Error While Connecting With The Cloudinary`,error.message)
    }
}
