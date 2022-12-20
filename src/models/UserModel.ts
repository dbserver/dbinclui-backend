import { model, Schema } from "mongoose";
import { UserEntity } from "../entities/UserEntity";
import { defaultSchemaSettings } from "./settings/defaultSchemaSettings";
import { userSchemaSettings } from "./settings/userSchemaSettings";

const UserSchema = new Schema<UserEntity>(userSchemaSettings, defaultSchemaSettings);

const UserModel = model<UserEntity>("user", UserSchema, "users")

export {UserModel}