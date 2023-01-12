import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class InMemoryDigitalContentRepository implements DigitalContentRepository {
  database: DigitalContentEntity[] = [];

  async create(content: DigitalContentEntity): Promise<DigitalContentEntity> {
    content._id = String(this.database.length);
    this.database.push(content);
    return this.database[this.database.length - 1];
  }

  async update(content: DigitalContentEntity): Promise<DigitalContentEntity> {
    const result = await this.findById(content._id as string);

    if (!result) {
      throw new Error("Digital Content does not exists");
    }

    const index = this.database.indexOf(result);

    this.database[index] = content;

    return this.database[index];
  }

  async findById(id: string): Promise<DigitalContentEntity | null> {
    const result = this.database.find((guide) => (guide._id as string) === id);
    return result ?? null;
  }

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database;
  }

  async deleteLogic(id: string): Promise<DigitalContentEntity | null> {
    const result = await this.findById(id);

    if (!result) {
      throw new Error("Digital Content does not exists");
    }

    const index = this.database.indexOf(result);

    result.deleted = true;

    this.database[index] = result;

    return this.database[index];
  }

  async delete(id: string): Promise<DigitalContentEntity> {
    const result = await this.findById(id);

    if (!result) {
      throw new Error("Digital Content does not exists");
    }
    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return result;
  }

  async findByGuideId(id: string): Promise<DigitalContentEntity[]> {
    const result = this.database.filter((content) => content.guide._id === id);

    return result ?? [];
  }

  async loadData(amount: number) {
    for (let i = 0; i < amount; i++) {
      const contentExample: DigitalContentEntity = {
        _id: String(this.database.length),
        title: `Título do conteúdo digital ${this.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        author: {
          _id: String(this.database.length),
          uid: String(this.database.length),
          name: `User ${this.database.length}`,
          email: `user${this.database.length}@email.com`,
          admin: false,
        },
        guide: {
          _id: String(this.database.length),
          title: `Título do guia ${this.database.length}`,
          content: `Conteúdo do guia ${this.database.length}`,
          filePaths: {
            filePath: `www.image${this.database.length}.com.br`,
            publicId: `uploads/image${this.database.length}`,
          },
          author: {
            _id: String(this.database.length),
            uid: String(this.database.length),
            name: `User ${this.database.length}`,
            email: `user${this.database.length}@email.com`,
            admin: false,
          },
        },
        category: {
          _id: String(this.database.length),
          title: `Título da categoria ${this.database.length}`,
          shortDescription: `Descrição da categoria ${this.database.length}`,
          guide: {
            _id: String(this.database.length),
            title: `Título do guia ${this.database.length}`,
            content: `Conteúdo do guia ${this.database.length}`,
            filePaths: {
              filePath: `www.image${this.database.length}.com.br`,
              publicId: `uploads/image${this.database.length}`,
            },
            author: {
              _id: String(this.database.length),
              uid: String(this.database.length),
              name: `User ${this.database.length}`,
              email: `user${this.database.length}@email.com`,
              admin: false,
            },
          },
          author: {
            _id: String(this.database.length),
            uid: String(this.database.length),
            name: `User ${this.database.length}`,
            email: `user${this.database.length}@email.com`,
            admin: false,
          },
        },
        filePaths: [
          {
            publicId: `arquivo${this.database.length}`,
            filePath: `link.com/arquivo${this.database.length}`,
          },
        ],
      };

      this.database.push(contentExample);
    }
  }

  async clear() {
    this.database = [];
  }

  async findByCategoryId(id: string): Promise<DigitalContentEntity[]> {
    const content = this.database.filter((guide) => guide.category._id === id);

    return content ?? [];
  }
}
