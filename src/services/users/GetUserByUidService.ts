import { UserEntity } from "../../entities/UserEntity";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserByUidService {
  constructor(private readonly repository: UserRepository) {}
  async execute(user: UserEntity) {
    try {
      const userFinded = await this.repository.findByUid(user.uid);

      if (userFinded) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
