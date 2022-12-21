import { model, Schema } from "mongoose";
import { UserEntity } from "../entities/UserEntity.js";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings.js";
import { userSchemaSettings } from "./settings/userSchemaSettings.js";

const UserSchema = new Schema<UserEntity>(userSchemaSettings, defaultSchemaSettings);

const UserModel = model<UserEntity>("user", UserSchema, "users");

export { UserModel };
