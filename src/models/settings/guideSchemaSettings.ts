import { Schema } from "mongoose";

export const guideSchemaSettings = {
  title: {
    type: String,
    required: true,
    maxlength: 32,
  },
  content: {
    type: String,
    required: true,
  },
  filePaths: {
    type: {
      filePath: String,
      publicId: String,
    },
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
};
