import { model, Schema } from "mongoose";
import { CategoryEntity } from "../entities/CategoryEntity.js";
import { categorySchemaSettings } from "./settings/categorySchemaSettings.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";

const CategorySchema = new Schema<CategoryEntity>(categorySchemaSettings, defaultSchemaSettings);

const CategoryModel = model<CategoryEntity>("category", CategorySchema, "categories");

export { CategoryModel };
