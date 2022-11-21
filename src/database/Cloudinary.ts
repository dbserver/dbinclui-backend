import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

interface CloudParams {
  folder: string;
  resource_type: string;
}

export class Cloudinary {
  initializeConfig() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  storage() {
    return new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "uploads",
        resource_type: "auto",
      } as CloudParams,
    });
  }
}
