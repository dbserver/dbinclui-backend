import { model, Schema } from "mongoose";
import { DigitalContentEntity } from "../entities/DigitalContentEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { digitalSchemaSettings } from "./settings/digitalSchemaSettings.js";

const DigitalContentSchema = new Schema<DigitalContentEntity>(
  digitalSchemaSettings,
  defaultSchemaSettings,
);

const DigitalContentModel = model<DigitalContentEntity>(
  "digitalContent",
  DigitalContentSchema,
  "digitalContents",
);

export { DigitalContentModel };
