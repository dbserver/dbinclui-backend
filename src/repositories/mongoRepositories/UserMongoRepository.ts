import { UserEntity } from "../../entities/UserEntity";
import { UserModel } from "../../models/UserModel";
import { UserRepository } from "../UserRepository";

export class UserMongoRepository implements UserRepository {
  database = UserModel;

  async create(user: UserEntity): Promise<UserEntity> {
    return this.database.create(user);
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    return this.database.findOne({ uid: uid });
  }
}
