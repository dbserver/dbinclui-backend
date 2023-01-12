import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { CategoryModel } from "../../models/CategoryModel.js";
import { DigitalContentModel } from "../../models/DigitalContentModel.js";
import { GuideModel } from "../../models/GuideModel.js";
import { UserModel } from "../../models/UserModel.js";
import { DigitalContentRepository } from "../DigitalContentRepository.js";

interface MediaProps {
  public_id: string;
  newFilePath: string;
  newPublicId: string;
}

export class DigitalContentMongoRepository implements DigitalContentRepository {
  database = DigitalContentModel;

  async create(content: DigitalContentEntity): Promise<DigitalContentEntity> {
    return this.database.create(content);
  }

  async update(content: DigitalContentEntity): Promise<DigitalContentEntity | null> {
    return this.database.findOneAndUpdate({ _id: content._id }, content, { new: true });
  }

  async findById(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findById(id).populate([
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

  async findMediaByPublicId(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findOne({ "filePaths.filename": id });
  }

  async updateMediaByPublicId({ public_id, newFilePath, newPublicId }: MediaProps) {
    const result = await this.database.findOneAndUpdate(
      { "filePaths.publicId": public_id },
      {
        $set: {
          "filePaths.$": {
            filePath: newFilePath,
            publicId: newPublicId,
          },
        },
      },
      {
        new: true,
      },
    );
    return result;
  }

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database
      .find()
      .where("deleted")
      .equals(false)
      .populate([
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

  async deleteLogic(id: string, updatedBy: string): Promise<DigitalContentEntity | null> {
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
  async delete(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findOneAndDelete({ _id: id });
  }
}
