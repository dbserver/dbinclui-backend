import { v2 as cloudinary } from "cloudinary";
import { FileProps } from "../../entities/DigitalContentEntity.js";

export const deleteContentCloudinary = async (images: FileProps[]) => {
  const paths: string[] = [];
  for (let img of images) {
    paths.push(img.publicId);
  }

  await cloudinary.api.delete_resources(paths);
};
