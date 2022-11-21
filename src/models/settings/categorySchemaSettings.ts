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
};
