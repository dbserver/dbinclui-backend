import { model, Schema } from "mongoose";
import { DBExpressionEntity } from "../entities/DBExpressionEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { dbExpressionSchemaSettings } from "./settings/dbExpressionSchemaSettings.js";

const dbExpressionSchema = new Schema<DBExpressionEntity>(
  dbExpressionSchemaSettings,
  defaultSchemaSettings,
);

const DBExpressionsModel = model<DBExpressionEntity>("dbExpression", dbExpressionSchema, "DBExpressions");

export { DBExpressionsModel };