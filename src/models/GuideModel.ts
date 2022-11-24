import { model, Schema } from "mongoose";
import { GuideEntity } from "../entities/GuideEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { guideSchemaSettings } from "./settings/guideSchemaSettings.js";

const GuideSchema = new Schema<GuideEntity>(guideSchemaSettings, defaultSchemaSettings);

const GuideModel = model<GuideEntity>("guide", GuideSchema, "guides");

export { GuideModel };
