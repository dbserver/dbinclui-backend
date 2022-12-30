import { UserExpressionEntity } from "../entities/UserExpressionEntity.js";

export interface UsersExpressionsRepository {
  create(content: UserExpressionEntity): Promise<UserExpressionEntity>;
}
