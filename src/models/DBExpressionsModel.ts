import { model, Schema } from "mongoose";
import { DBExpressionEntity } from "../entities/DBExpressionEntity";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings";
import { dbExpressionSchemaSettings } from "./settings/dbExpressionSchemaSettings";

const dbExpressionSchema = new Schema<DBExpressionEntity>(
  dbExpressionSchemaSettings,
  defaultSchemaSettings,
);

const DBExpressionsModel = model<DBExpressionEntity>("dbExpression", dbExpressionSchema, "DBExpressions");

export { DBExpressionsModel };