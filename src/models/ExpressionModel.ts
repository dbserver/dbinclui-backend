import { model, Schema } from "mongoose";
import { ExpressionEntity } from "../entities/ExpressionEntity.js";
import { GuideEntity } from "../entities/GuideEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { expressionSchemaSettings } from "./settings/expressionSchemaSettings.js";

const ExpressionSchema = new Schema<ExpressionEntity>(
  expressionSchemaSettings,
  defaultSchemaSettings,
);

const ExpressionModel = model<GuideEntity>("expression", ExpressionSchema, "expressions");

export { ExpressionModel };
