import { DigitalContentEntity } from "../entities/DigitalContentEntity.js";

export interface DigitalContentRepository {
  create(content: DigitalContentEntity): Promise<DigitalContentEntity>;
  update(content: DigitalContentEntity): Promise<DigitalContentEntity | null>;
  findAll(): Promise<DigitalContentEntity[]>;
  findById(id: string): Promise<DigitalContentEntity | null>;
  findByCategoryId(id: string): Promise<DigitalContentEntity[]>;
  findByGuideId(id: string): Promise<DigitalContentEntity[]>;
  delete(id: string): Promise<DigitalContentEntity | null>;
}
