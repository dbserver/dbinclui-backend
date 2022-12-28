import { CategoryEntity } from "../entities/CategoryEntity.js";
import { DigitalContentEntity } from "../entities/DigitalContentEntity.js";
import { GuideEntity } from "../entities/GuideEntity.js";

interface CategoriesAndContents extends CategoryEntity {
  digitalContents: DigitalContentEntity[];
}

export interface GuideCategoriesAndContentsInterface extends GuideEntity {
  categories: CategoriesAndContents[];
}
