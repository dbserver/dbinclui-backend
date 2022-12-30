import { model, Schema } from "mongoose";
import { UserExpressionEntity } from "../entities/UserExpressionEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { usersExpressionSchemaSettings } from "./settings/usersExpressionSchemaSettings.js";

const UsersExpressionsSchema = new Schema<UserExpressionEntity>(
  usersExpressionSchemaSettings,
  defaultSchemaSettings,
);

const UsersExpressionsModel = model<UserExpressionEntity>("userExpression", UsersExpressionsSchema, "usersExpressions");

export { UsersExpressionsModel };
