import { DBExpressionEntity } from "../entities/DBExpressionEntity";

export interface DBExpressionsRepository {
  create(content: DBExpressionEntity): Promise<DBExpressionEntity>;
  findAll(): Promise<DBExpressionEntity[]>;
  findById(id: string): Promise<DBExpressionEntity | null>;
}
