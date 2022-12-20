import { ExpressionEntity } from "../../entities/ExpressionEntity";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository";

export class UserExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;
  create(expression: ExpressionEntity): Promise<ExpressionEntity> {
    return this.database.create(expression);
  }
}