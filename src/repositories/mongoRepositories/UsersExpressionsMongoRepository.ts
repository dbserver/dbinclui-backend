import { UserExpressionEntity } from "../../entities/UserExpressionEntity.js";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel.js";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository.js";


export class UsersExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;

  async create(expression: UserExpressionEntity): Promise<UserExpressionEntity> {
    return this.database.create(expression);
  }
}
