import multer from "multer";

import { Cloudinary } from "../../database/Cloudinary.js";

const database = new Cloudinary();

const storage = database.storage();

const multerCloudinaryConfig: multer.Options = {
  fileFilter: (_, file, callback) => {
    const allowedMimes = /video|image/;

    if (!allowedMimes.test(file.mimetype)) {
      return callback(new Error("Arquivo não suportado. Envie apenas vídeo ou imagem."));
    }

    return callback(null, true);
  },
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};

export const uploadCloudinary = multer(multerCloudinaryConfig);
