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

  async favorite(expressionID: string, userID: string): Promise<DBExpressionEntity | null> {
    return this.database.findOne({ _id: expressionID }).then(async (data) => {
      if (!data) return null;

      let index = -1;

      const user = data.favoriteOf?.find((user, userIndex) => {
        index = userIndex;
        return user.toString() === userID.toString();
      });

      if (!user) {
        const id = userID as any;
        data.favoriteOf?.push(id);
        await data.save();
        return data;
      }

      data.favoriteOf?.splice(index, 1);

      await data.save();
      return data;
    });
  }

  async deleteLogic(id: string, updatedBy: string): Promise<DBExpressionEntity | null> {
    return this.database.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          updatedBy: updatedBy,
          deleted: true,
        },
      },
      { new: true },
    );
  }
}
