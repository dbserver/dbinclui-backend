import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class InMemoryCategoryRepository implements CategoryRepository {
  database: CategoryEntity[] = [];

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    category._id = String(this.database.length);
    this.database.push(category);
    return this.database[this.database.length - 1];
  }

  async update(category: CategoryEntity): Promise<number> {
    const result = await this.findById(category._id as unknown as string);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database[index] = category;

    return 1;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const result = this.database.find((category) => (category._id as unknown as string) === id);
    return result ?? null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.database;
  }

  async delete(id: string): Promise<number> {
    const result = await this.findById(id);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return 1;
  }

  async findByGuideId(guideId: string): Promise<CategoryEntity[]> {
    const result = this.database.filter((category) => category.guide._id === guideId);

    return result;
  }

  async loadUniqueData() {
    const categoryExample: CategoryEntity = {
      _id: String(this.database.length),
      title: `Título da categoria ${String(this.database.length)}`,
      shortDescription: `Descrição da categoria ${String(this.database.length)}`,
      guide: {
        _id: "0",
        title: `Título do guia 0`,
        content: "Conteúdo do guia 0",
      },
    };

    this.database.push(categoryExample);
  }

  async loadData(amount: number) {
    for (let i = 0; i < amount; i++) {
      const categoryExample: CategoryEntity = {
        _id: String(this.database.length),
        title: `Título da categoria ${String(this.database.length)}`,
        shortDescription: `Descrição da categoria ${String(this.database.length)}`,
        guide: {
          _id: `${i}`,
          title: `Título do guia ${i}`,
          content: `Conteúdo do guia ${i}`,
        },
      };

      this.database.push(categoryExample);
    }
  }
}
