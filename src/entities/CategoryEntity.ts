import { GuideEntity } from "./GuideEntity.js";
import { UserEntity } from "./UserEntity.js";

export interface CategoryEntity {
  _id?: string;
  title: string;
  shortDescription: string;
  guide: GuideEntity;
  author: UserEntity;
  updatedBy?: UserEntity;
  deleted?: boolean;
}
