export interface UserEntity {
  _id?: string;
  uid: string;
  name: string;
  email: string;
  admin?: boolean;
}
