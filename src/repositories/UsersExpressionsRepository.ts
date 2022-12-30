import { UserExpressionEntity } from "../entities/UserExpressionEntity.js";

export interface UsersExpressionsRepository {
  create(content: UserExpressionEntity): Promise<UserExpressionEntity>;
  findById(id: string): Promise<UserExpressionEntity | null>;
  findAllById(id: string): Promise<UserExpressionEntity[]>;
  delete(id: string): Promise<UserExpressionEntity | null>;
}
