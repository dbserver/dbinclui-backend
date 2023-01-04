import { UserExpressionEntity } from "../../entities/UserExpressionEntity.js";
import { UserModel } from "../../models/UserModel.js";
import { UsersExpressionsModel } from "../../models/UsersExpressionsModel.js";
import { UsersExpressionsRepository } from "../UsersExpressionsRepository.js";

export class UsersExpressionsMongoRepository implements UsersExpressionsRepository {
  database = UsersExpressionsModel;

  async create(expression: UserExpressionEntity): Promise<UserExpressionEntity> {
    return UsersExpressionsModel.create(expression);
  }

  async update(expression: UserExpressionEntity): Promise<UserExpressionEntity | null> {
    return this.database.findOneAndUpdate({ _id: expression._id }, expression, { new: true });
  }
  async findById(id: string): Promise<UserExpressionEntity | null> {
    return this.database.findOne({ _id: id }).populate([
      {
        path: "author",
        model: UserModel,
        strictPopulate: true,
      },
    ]);
  }

  async findAllById(id: string): Promise<UserExpressionEntity[]> {
    return this.database.find({ author: id });
  }

  async delete(id: string): Promise<UserExpressionEntity | null> {
    return this.database.findOneAndDelete({ _id: id });
  }
}
