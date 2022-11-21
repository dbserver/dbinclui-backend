import { CategoryEntity } from "../entities/CategoryEntity";
import { DigitalContentEntity } from "../entities/DigitalContentEntity";
import { GuideEntity } from "../entities/GuideEntity";

interface CategoriesAndContents extends CategoryEntity {
  digitalContents: DigitalContentEntity[];
}

export interface GuideCategoriesAndContentsInterface extends GuideEntity {
  categories: CategoriesAndContents[];
}
