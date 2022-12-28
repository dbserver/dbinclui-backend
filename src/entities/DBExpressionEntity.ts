import { UserEntity } from "./UserEntity";

export interface DBExpressionEntity {
  _id?: string;
  expression: string;
  author: UserEntity;
}