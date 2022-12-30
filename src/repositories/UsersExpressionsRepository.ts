import { UserExpressionEntity } from "../entities/UserExpressionEntity.js";

export interface UsersExpressionsRepository {
  create(content: UserExpressionEntity): Promise<UserExpressionEntity>;
  findAllById(id: string): Promise<UserExpressionEntity[]>;
  delete(id: string): Promise<UserExpressionEntity | null>;
}
