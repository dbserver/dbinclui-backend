import { Schema } from "mongoose";

export const expressionSchemaSettings = {
  expression: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
};
