import { UserEntity } from "./UserEntity";

export interface DBExpressionEntity {
  _id?: string;
  expression: string;
  author: UserEntity;
  deleted?: boolean;
  favoriteOf?: UserEntity[];
  updatedBy?: UserEntity;
}
