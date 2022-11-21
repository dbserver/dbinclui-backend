import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryModel } from "../../models/CategoryModel.js";
import { GuideModel } from "../../models/GuideModel.js";
import { CategoryRepository } from "../CategoryRepository.js";

export class CategoryMongoRepository implements CategoryRepository {
  database = CategoryModel;

  async create(guide: CategoryEntity): Promise<CategoryEntity> {
    return this.database.create(guide);
  }

  async update(guide: CategoryEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: guide._id }, guide);
    return result.modifiedCount;
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

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }

  async findByGuideId(guideId: string): Promise<CategoryEntity[]> {
    return this.database.find({ guide: guideId }).populate({
      path: "guide",
      model: GuideModel,
    });
  }
}
