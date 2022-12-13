import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathDest = path.resolve(__dirname, "..", "..", "..", "..", "temps", "uploads");

if (!fs.existsSync(pathDest)) {
  fs.mkdirSync(pathDest, { recursive: true });
}

const multerLocalStorageConfig: multer.Options = {
  dest: pathDest,
  storage: multer.diskStorage({
    destination: (_, __, callback) => callback(null, pathDest),
    filename: (_, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err, "");

        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, //2mb
  },
  fileFilter: (_, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
};

export const guideUploadLocal = multer(multerLocalStorageConfig);
