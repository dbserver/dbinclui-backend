import { GuideEntity } from "../../entities/GuideEntity.js";
import { FileProps } from "../../interfaces/FilePropsInterface.js";
import { GuideRepository } from "../../repositories/GuideRepository.js";

export class UpdateGuideService {
  constructor(private readonly repository: GuideRepository) {}

  async execute(id: string, guideRequest: GuideEntity, file?: FileProps) {
    try {
      const guide = await this.repository.findById(id);

      if (!guide) {
        return new Error("Guide does not exists");
      }

      let oldFile: FileProps[] = [];
      if (file) {
        oldFile.push(guide.filePaths);
      }

      guide.title = guideRequest.title ?? guide.title;
      guide.content = guideRequest.content ?? guide.content;
      guide.filePaths = file ?? guide.filePaths;
      guide.updatedBy = guideRequest.updatedBy;

      const guideUpdated = await this.repository.update(guide);

      return { guideUpdated, oldFile };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
