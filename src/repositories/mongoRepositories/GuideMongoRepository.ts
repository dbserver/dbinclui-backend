import { Types } from "mongoose";
import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideCategoriesAndContentsInterface } from "../../interfaces/GuideCategoriesAndContentsInterface.js";
import { GuideModel } from "../../models/GuideModel.js";
import { GuideRepository } from "../GuideRepository.js";

export class GuideMongoRepository implements GuideRepository {
  database = GuideModel;

  async create(guide: GuideEntity): Promise<GuideEntity> {
    return this.database.create(guide);
  }

  async update(guide: GuideEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: guide._id }, guide);
    return result.modifiedCount;
  }

  async findById(id: string): Promise<GuideEntity | null> {
    return this.database.findById(id);
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database.find();
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }

  async findCategoriesAndContentsByGuideId(
    id: string,
  ): Promise<GuideCategoriesAndContentsInterface> {
    const [guide] = await this.database.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "categories",
          let: { guideId: "$_id" },
          as: "categories",
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$guideId", "$guide"],
                },
              },
            },
            {
              $lookup: {
                from: "digitalContents",
                let: { categoryId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$$categoryId", "$category"],
                      },
                    },
                  },
                ],
                as: "digitalContents",
              },
            },
          ],
        },
      },
    ]);

    return guide as GuideCategoriesAndContentsInterface;
  }
}
