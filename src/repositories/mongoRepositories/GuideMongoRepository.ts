import { Types } from "mongoose";
import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideCategoriesAndContentsInterface } from "../../interfaces/GuideCategoriesAndContentsInterface.js";
import { GuideModel } from "../../models/GuideModel.js";
import { GuideRepository } from "../GuideRepository.js";
import { UserModel } from "../../models/UserModel.js";

export class GuideMongoRepository implements GuideRepository {
  database = GuideModel;

  async create(guide: GuideEntity): Promise<GuideEntity> {
    return this.database.create(guide);
  }

  async update(guide: GuideEntity): Promise<GuideEntity | null> {
    return this.database.findOneAndUpdate({ _id: guide._id }, guide, { new: true });
  }

  async findById(id: string): Promise<GuideEntity | null> {
    return this.database
      .findById(id)
      .populate([
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
      ])
      .exec();
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database
      .find()
      .where("deleted")
      .equals(false)
      .populate([
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

  async deleteLogic(id: string, updatedBy: string): Promise<GuideEntity | null> {
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

  async delete(id: string): Promise<GuideEntity | null> {
    return this.database.findOneAndDelete({ _id: id });
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
