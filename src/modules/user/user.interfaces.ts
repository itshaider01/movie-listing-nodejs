import mongoose, { Model, Document } from 'mongoose';
import { AccessTokens } from '../token/token.interfaces';
export interface IUser {
  email: string;
  password: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}
export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}
export type UpdateUserBody = Partial<IUser>;
export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessTokens;
}