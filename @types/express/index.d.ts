import { UserEntity } from "../../src/entities/UserEntity"; 

declare global {
  namespace Express {
    interface Request {
      currentUser: UserEntity;
    }
  }
}
