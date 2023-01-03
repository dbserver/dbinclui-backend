import { DBExpressionEntity } from "../../entities/DBExpressionEntity.js";
import { DBExpressionsModel } from "../../models/DBExpressionsModel.js";
import { DBExpressionsRepository } from "../DBExpressionsRepository.js";

export class DBExpressionsMongoRepository implements DBExpressionsRepository {
  database = DBExpressionsModel;

  async create(expression: DBExpressionEntity): Promise<DBExpressionEntity> {
    return this.database.create(expression);
  }

  async findAll(): Promise<DBExpressionEntity[]> {
    return this.database.find({ deleted: false });
  }
}
