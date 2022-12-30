import { UserEntity } from "./UserEntity.js";

export interface UserExpressionEntity {
  _id?: string;
  expression: string;
  author: UserEntity;
  favorite?: boolean;
}
