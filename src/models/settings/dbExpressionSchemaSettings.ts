import { Schema } from "mongoose";

export const dbExpressionSchemaSettings = {
  expression: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  favoriteOf: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
};