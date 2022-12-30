import { UserExpressionEntity } from "../../entities/UserExpressionEntity.js";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel.js";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository.js";


export class UsersExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;

  async create(expression: UserExpressionEntity): Promise<UserExpressionEntity> {
    return UsersExpressionsModel.create(expression);
  }
 
  async findAllById(id: string): Promise<UserExpressionEntity[]> {
    return this.database.find({author: id});
  }

  async delete(id: string): Promise<UserExpressionEntity | null> {
    return this.database.findOneAndDelete({_id: id});
  }
}
