import { model, Schema } from "mongoose";
import { ExpressionEntity } from "../entities/ExpressionEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { userExpressionSchemaSettings } from "./settings/userExpressionSchemaSettings.js";

const UserExpressionSchema = new Schema<ExpressionEntity>(
  userExpressionSchemaSettings,
  defaultSchemaSettings,
);

const UserExpressionModel = model<ExpressionEntity>("expression", UserExpressionSchema, "userExpressions");

export { UserExpressionModel };
