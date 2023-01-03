import { GuideEntity } from "../entities/GuideEntity.js";
import { GuideCategoriesAndContentsInterface } from "../interfaces/GuideCategoriesAndContentsInterface.js";

export interface GuideRepository {
  create(guide: GuideEntity): Promise<GuideEntity>;
  update(guide: GuideEntity): Promise<GuideEntity | null>;
  findAll(): Promise<GuideEntity[]>;
  findById(id: string): Promise<GuideEntity | null>;
  findCategoriesAndContentsByGuideId(
    id: string,
  ): Promise<GuideCategoriesAndContentsInterface | null>;
  deleteLogic(id: string, updatedBy: string): Promise<GuideEntity | null>;
  delete(id: string): Promise<GuideEntity | null>;
}
