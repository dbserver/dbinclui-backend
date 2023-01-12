import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryModel } from "../../models/CategoryModel.js";
import { GuideModel } from "../../models/GuideModel.js";
import { UserModel } from "../../models/UserModel.js";
import { CategoryRepository } from "../CategoryRepository.js";

export class CategoryMongoRepository implements CategoryRepository {
  database = CategoryModel;

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return this.database.create(category);
  }

  async update(category: CategoryEntity): Promise<CategoryEntity | null> {
    return this.database.findOneAndUpdate({ _id: category._id }, category, { new: true });
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    return this.database.findById(id).populate([
      {
        path: "author",
        model: UserModel,
        strictPopulate: true,
      },
      {
        path: "updatedBy",
        model: UserModel,
        strictPopulate: true,
      },
    ]);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.database
      .find()
      .where("deleted")
      .equals(false)
      .populate([
        {
          path: "guide",
          model: GuideModel,
        },
        {
          path: "author",
          model: UserModel,
          strictPopulate: true,
        },
        {
          path: "updatedBy",
          model: UserModel,
          strictPopulate: true,
        },
      ]);
  }

  async deleteLogic(id: string, updatedBy: string): Promise<CategoryEntity | null> {
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

  async delete(id: string): Promise<CategoryEntity | null> {
    return await this.database.findByIdAndDelete({ _id: id });
  }

  async findByGuideId(guideId: string): Promise<CategoryEntity[]> {
    return this.database.find({ guide: guideId }).populate([
      {
        path: "guide",
        model: GuideModel,
      },
      {
        path: "author",
        model: UserModel,
        strictPopulate: true,
      },
      {
        path: "updatedBy",
        model: UserModel,
        strictPopulate: true,
      },
    ]);
  }
}
