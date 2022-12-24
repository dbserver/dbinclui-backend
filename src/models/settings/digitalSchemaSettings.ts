import { Schema } from "mongoose";

export const digitalSchemaSettings = {
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  guide: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "guides",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  filePaths: [
    {
      type: {
        filePath: String,
        publicId: String,
      },
      required: true,
    },
  ],
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
