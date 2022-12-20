import { ExpressionEntity } from "../../entities/ExpressionEntity";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository";

export class UsersExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;

  async create(expression: ExpressionEntity): Promise<ExpressionEntity> {
    return this.database.create(expression);
  }
}
