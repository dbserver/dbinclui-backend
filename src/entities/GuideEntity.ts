import { FileProps } from "../interfaces/FilePropsInterface.js";

export interface GuideEntity {
  _id?: string;
  title: string;
  content: string;
  filePaths: FileProps;
}
