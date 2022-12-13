import multer from "multer";

import { Cloudinary } from "../../../database/Cloudinary.js";

const database = new Cloudinary();

const storage = database.storage();

const multerCloudinaryConfig: multer.Options = {
  fileFilter: (_, file, callback) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video",
    ];

    const allowedVideos = /video/;

    if (allowedMimes.includes(file.mimetype) || allowedVideos.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
};

export const uploadCloudinary = multer(multerCloudinaryConfig);
