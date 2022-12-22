import { DBExpressionEntity } from "../entities/DBExpressionEntity";

export interface DBExpressionsRepository {
  create(content: DBExpressionEntity): Promise<DBExpressionEntity>;
}