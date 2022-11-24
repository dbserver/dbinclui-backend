import { CategoryEntity } from "./CategoryEntity.js";
import { GuideEntity } from "./GuideEntity.js";
import { FileProps } from "../interfaces/FilePropsInterface.js";

export interface DigitalContentEntity {
  _id?: string;
  title: string;
  shortDescription: string;
  category: CategoryEntity;
  guide: GuideEntity;
  filePaths: FileProps[];
}
