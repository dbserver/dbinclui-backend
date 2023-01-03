import { FileProps } from "../interfaces/FilePropsInterface.js";
import { UserEntity } from "./UserEntity.js";

export interface GuideEntity {
  _id?: string;
  title: string;
  content: string;
  filePaths: FileProps;
  author: UserEntity;
  updatedBy?: UserEntity;
  deleted?: boolean;
}
