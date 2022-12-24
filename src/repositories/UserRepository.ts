import { UserEntity } from "../entities/UserEntity.js";

export interface UserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findByUid(uid: string): Promise<UserEntity | null>;
}
