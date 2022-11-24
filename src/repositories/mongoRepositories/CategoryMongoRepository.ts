import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryModel } from "../../models/CategoryModel.js";
import { GuideModel } from "../../models/GuideModel.js";
import { CategoryRepository } from "../CategoryRepository.js";

export class CategoryMongoRepository implements CategoryRepository {
  database = CategoryModel;

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return this.database.create(category);
  }

  async update(category: CategoryEntity): Promise<CategoryEntity | null> {
    return this.database.findOneAndUpdate({ _id: category._id }, category);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    return this.database.findById(id);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.database.find().populate({
      path: "guide",
      model: GuideModel,
    });
  }

  async delete(id: string): Promise<CategoryEntity | null> {
    return await this.database.findByIdAndDelete({ _id: id });
  }

  async findByGuideId(guideId: string): Promise<CategoryEntity[]> {
    return this.database.find({ guide: guideId }).populate({
      path: "guide",
      model: GuideModel,
    });
  }
}
