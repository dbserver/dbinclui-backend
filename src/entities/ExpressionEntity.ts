import { UserEntity } from "./UserEntity";

export interface ExpressionEntity {
  _id?: string;
  expression: string;
  author: UserEntity;
}
