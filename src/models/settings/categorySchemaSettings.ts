import { Schema } from "mongoose";

export const categorySchemaSettings = {
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
    ref: "guide",
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
