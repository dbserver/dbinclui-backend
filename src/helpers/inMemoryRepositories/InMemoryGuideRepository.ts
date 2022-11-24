import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideCategoriesAndContentsInterface } from "../../interfaces/GuideCategoriesAndContentsInterface.js";
import { GuideRepository } from "../../repositories/GuideRepository.js";

export class InMemoryGuideRepository implements GuideRepository {
  databaseWithCategoryAndContents: GuideCategoriesAndContentsInterface[] = [];
  database: GuideEntity[] = [];

  async create(guide: GuideEntity): Promise<GuideEntity> {
    guide._id = String(this.database.length);
    this.database.push(guide);
    return this.database[this.database.length - 1];
  }

  async update(guide: GuideEntity): Promise<GuideEntity> {
    const result = await this.findById(guide._id as string);

    if (!result) {
      throw new Error("Guide does not exists");
    }

    const index = this.database.indexOf(result);

    this.database[index] = guide;

    return result;
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database;
  }

  async findById(id: string): Promise<GuideEntity | null> {
    const result = this.database.find((guide) => (guide._id as unknown as string) === id);
    return result ?? null;
  }

  async findCategoriesAndContentsByGuideId(
    id: string,
  ): Promise<GuideCategoriesAndContentsInterface | null> {
    const result = this.databaseWithCategoryAndContents.find((guide) => guide._id === id);

    return result ?? null;
  }

  async delete(id: string): Promise<GuideEntity> {
    const result = await this.findById(id);

    if (!result) {
      throw new Error("Guide does not exists");
    }

    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return result;
  }

  async loadData(amount: number) {
    for (let i = 0; i < amount; i++) {
      const guideExample: GuideEntity = {
        _id: String(this.database.length),
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `wwww.image${i}.com.br`,
          publicId: `uploads/${i}`,
        },
      };

      this.database.push(guideExample);
    }
  }

  async loadDataWithCategoriesandContents(amount: number) {
    for (let i = 0; i < amount; i++) {
      const guideWithCategoriesAndContent: GuideCategoriesAndContentsInterface = {
        _id: i.toString(),
        title: `Título do guia ${i}`,
        content: `Conteúdo do guia ${i}`,
        filePaths: {
          filePath: `wwww.image${i}.com.br`,
          publicId: `uploads/${i}`,
        },

        categories: [
          {
            _id: i.toString(),
            title: `Título da categoria ${i}`,
            shortDescription: `Descrição da categoria ${i}`,
            guide: {
              _id: i.toString(),
              title: `Título do guia ${i}`,
              content: `Conteúdo do guia ${i}`,
              filePaths: {
                filePath: `wwww.image${i}.com.br`,
                publicId: `uploads/${i}`,
              },
            },
            digitalContents: [
              {
                _id: i.toString(),
                title: `Título do conteúdo ${i}`,
                shortDescription: `Descrição do conteúdo ${i}`,
                category: {
                  _id: i.toString(),
                  title: `Título da categoria ${i}`,
                  shortDescription: `Descrição da categoria ${i}`,
                  guide: {
                    _id: i.toString(),
                    title: `Título do guia ${i}`,
                    content: `Conteúdo do guia ${i}`,
                    filePaths: {
                      filePath: `wwww.image${i}.com.br`,
                      publicId: `uploads/${i}`,
                    },
                  },
                },
                guide: {
                  _id: i.toString(),
                  title: `Título do guia ${i}`,
                  content: `Conteúdo do guia ${i}`,
                  filePaths: {
                    filePath: `wwww.image${i}.com.br`,
                    publicId: `uploads/${i}`,
                  },
                },
                filePaths: [
                  {
                    publicId: `PublicID ${i}`,
                    filePath: `www.image${i}.com`,
                  },
                ],
              },
            ],
          },
        ],
      };

      this.databaseWithCategoryAndContents.push(guideWithCategoriesAndContent);
    }
  }
}
