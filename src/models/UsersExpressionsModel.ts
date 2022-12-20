import { model, Schema } from "mongoose";
import { ExpressionEntity } from "../entities/ExpressionEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { usersExpressionSchemaSettings } from "./settings/usersExpressionSchemaSettings.js";

const UsersExpressionsSchema = new Schema<ExpressionEntity>(
  usersExpressionSchemaSettings,
  defaultSchemaSettings,
);

const UsersExpressionsModel = model<ExpressionEntity>("userExpression", UsersExpressionsSchema, "usersExpressions");

export { UsersExpressionsModel };
