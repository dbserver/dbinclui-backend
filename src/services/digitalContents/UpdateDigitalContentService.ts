import { DigitalContentEntity, FileProps } from "../../entities/DigitalContentEntity.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

interface File {
  filePath: string;
  publicId: string;
}

export class UpdateDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string, contentRequest: DigitalContentEntity, files?: File[]) {
    try {
      const content = await this.repository.findById(id);

      if (!content) {
        return new Error("Digital Content does not exists");
      }

      let oldPublicIDs: string[] = [];
      if (files) {
        content.filePaths.forEach((file) => oldPublicIDs.push(file.publicId));
      }

      content.title = contentRequest?.title ?? content.title;
      content.guide = contentRequest?.guide ?? content.guide;
      content.shortDescription = contentRequest?.shortDescription ?? content.shortDescription;
      content.filePaths = files ?? content.filePaths;

      const result = await this.repository.update(id, content);

      return { result, oldPublic_ids: oldPublicIDs };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
