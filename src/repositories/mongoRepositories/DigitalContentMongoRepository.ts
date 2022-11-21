import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { CategoryModel } from "../../models/CategoryModel.js";
import { DigitalContentModel } from "../../models/DigitalContentModel.js";
import { GuideModel } from "../../models/GuideModel.js";
import { DigitalContentRepository } from "../DigitalContentRepository.js";

export class DigitalContentMongoRepository implements DigitalContentRepository {
  database = DigitalContentModel;

  async create(guide: DigitalContentEntity): Promise<DigitalContentEntity> {
    return this.database.create(guide);
  }

  async update(id: string, guide: DigitalContentEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: id }, guide);
    return result.modifiedCount;
  }

  async findById(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findById(id);
  }

  async findByGuideId(id: string): Promise<DigitalContentEntity[]> {
    return this.database.find().where("guide", id);
  }

  async findByCategoryId(id: string): Promise<DigitalContentEntity[]> {
    return this.database
      .find()
      .where("category", id)
      .populate([
        {
          path: "category",
          model: CategoryModel,
          strictPopulate: true,
        },
        {
          path: "guide",
          model: GuideModel,
          strictPopulate: true,
        },
      ]);
  }

  async findMediaByPublicId(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findOne({ "filePaths.filename": id });
  }

  async updateMediaByPublicId(public_id: string, newPath: string, newFilename: string) {
    const result = await this.database.updateOne(
      { "filePaths.filename": public_id },
      {
        $set: {
          "filePaths.$": {
            // _id: id,
            path: newPath,
            filename: newFilename,
          },
        },
      },
    );
    return result.modifiedCount;
  }

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database.find().populate([
      {
        path: "guide",
        model: GuideModel,
        strictPopulate: true,
      },
      {
        path: "category",
        model: CategoryModel,
        strictPopulate: true,
      },
    ]);
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }
}
