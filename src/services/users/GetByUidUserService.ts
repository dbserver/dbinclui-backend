import { UserRepository } from "../../repositories/UserRepository";

export class GetByUidService {
  constructor(private readonly repository: UserRepository) {}
  async execute(uid: string) {
    try {
      const result = await this.repository.findByUid(uid);

      if (!result) {
        return new Error("User with this UID does not exists");
      }

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
