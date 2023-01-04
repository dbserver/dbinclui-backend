import { ExpressionEntity } from "../../entities/ExpressionEntity.js";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel.js";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository.js";


export class UsersExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;

  async create(expression: ExpressionEntity): Promise<ExpressionEntity> {
   return this.database.create(expression);
  }
}
