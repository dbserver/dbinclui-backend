import { v2 as cloudinary } from "cloudinary";
import { FileProps } from "../../interfaces/FilePropsInterface";

export const deleteContentCloudinary = async (images: FileProps[]) => {
  try {
    if (images.length > 0) {
      const paths: string[] = [];
      for (let img of images) {
        paths.push(img.publicId);
      }

      // <--- Delete images --->
      await cloudinary.api.delete_resources(paths);

      // <--- Delete videos --->
      await cloudinary.api.delete_resources(paths, { resource_type: "video" });
    }
  } catch (error) {}
};
