import { UserEntity } from "./UserEntity.js";

export interface ExpressionEntity {
  _id?: string;
  expression: string;
  author: UserEntity;
}
