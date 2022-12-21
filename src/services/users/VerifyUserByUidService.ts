import { UserRepository } from "../../repositories/UserRepository";

export class VerifyUserByUidService {
  constructor(private readonly repository: UserRepository) {}
  async execute(uid: string) {
    try {
      const userFinded = await this.repository.findByUid(uid);

      if (userFinded) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
