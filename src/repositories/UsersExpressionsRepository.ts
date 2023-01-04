import { UserExpressionEntity } from "../entities/UserExpressionEntity.js";

export interface UsersExpressionsRepository {
  create(expression: UserExpressionEntity): Promise<UserExpressionEntity>;
  update(expression: UserExpressionEntity): Promise<UserExpressionEntity | null>;
  findById(id: string): Promise<UserExpressionEntity | null>;
  findAllById(id: string): Promise<UserExpressionEntity[]>;
  delete(id: string): Promise<UserExpressionEntity | null>;
}
