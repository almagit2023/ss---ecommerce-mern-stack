import { v2 as cloudinary } from "cloudinary";

export const uploadFileToCloudinary = async (file, folder, height, quality) => {
  try {
    if (!file || !file.tempFilePath) {
      throw new Error("File or tempFilePath is undefined");
    }


    const options = {
      folder: folder,
      resource_type: "auto",
    };
    if (height) options.height = height;
    if (quality) options.quality = quality;

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error(`Error uploading to Cloudinary: ${error.message}`);
    throw error;
  }
};
