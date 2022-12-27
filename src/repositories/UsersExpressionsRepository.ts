import { ExpressionEntity } from "../entities/ExpressionEntity.js";

export interface UsersExpressionsRepository {
  create(content: ExpressionEntity): Promise<ExpressionEntity>;
}
