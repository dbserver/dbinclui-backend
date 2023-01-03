import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { FileProps } from "../../interfaces/FilePropsInterface.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";
export class UpdateDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string, contentRequest: DigitalContentEntity, files: FileProps[]) {
    try {
      const content = await this.repository.findById(id);

      if (!content) {
        return new Error("Digital Content does not exists");
      }

      let oldFiles: FileProps[] = [];
      if (files.length > 0) {
        content.filePaths.forEach((file) => oldFiles.push(file));
      }

      content.title = contentRequest?.title ?? content.title;
      content.guide = contentRequest?.guide ?? content.guide;
      content.shortDescription = contentRequest?.shortDescription ?? content.shortDescription;
      content.filePaths = files.length > 0 ? files : content.filePaths;
      content.updatedBy = contentRequest.updatedBy;

      const contentUpdated = await this.repository.update(content);

      return { contentUpdated, oldFiles };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
