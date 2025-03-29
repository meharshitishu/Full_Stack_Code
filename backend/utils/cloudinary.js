import multer from "multer";
import cloudinary from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary";

cloudinary.config({
    cloud_NAME:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{folder:'uploads',format:async()=>'png'}
});

export const upload=multer({storage});