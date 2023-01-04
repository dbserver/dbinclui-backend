import { DBExpressionEntity } from "../../entities/DBExpressionEntity.js";
import { DBExpressionsModel } from "../../models/DBExpressionsModel.js";
import { UserModel } from "../../models/UserModel.js";
import { DBExpressionsRepository } from "../DBExpressionsRepository.js";

export class DBExpressionsMongoRepository implements DBExpressionsRepository {
  database = DBExpressionsModel;

  async create(expression: DBExpressionEntity): Promise<DBExpressionEntity> {
    return this.database.create(expression);
  }

  async findAll(): Promise<DBExpressionEntity[]> {
    return this.database.find({ deleted: false });
  }

  async findById(id: string): Promise<DBExpressionEntity | null> {
    return this.database.findOne({ _id: id }).populate([
      {
        path: "author",
        model: UserModel,
        strictPopulate: true,
      },
    ]);
  }
}
