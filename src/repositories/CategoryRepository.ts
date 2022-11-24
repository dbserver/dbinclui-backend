import { CategoryEntity } from "../entities/CategoryEntity.js";

export interface CategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity>;
  update(category: CategoryEntity): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | null>;
  findByGuideId(guideId: string): Promise<CategoryEntity[]>;
  delete(id: string): Promise<CategoryEntity | null>;
}
