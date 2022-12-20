import { model, Schema } from "mongoose";
import { ExpressionEntity } from "../entities/ExpressionEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { usersExpressionSchemaSettings } from "./settings/usersExpressionSchemaSettings.js";

const UsersExpressionSchema = new Schema<ExpressionEntity>(
  usersExpressionSchemaSettings,
  defaultSchemaSettings,
);

const UsersExpressionModel = model<ExpressionEntity>("expression", UsersExpressionSchema, "usersExpressions");

export { UsersExpressionModel };
