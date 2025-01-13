import httpStatus from "http-status";
import mongoose from "mongoose";
import User from "./user.model";
import {
  IUser,
  IUserDoc,
} from "./user.interfaces";
import { ApiError } from "../../config/errors";

/**
 * Register a user
 * @param {IUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (
  userBody: IUser
): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

/**
 * Get user by id
 * @param { mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (
  id: mongoose.Schema.Types.ObjectId
): Promise<IUserDoc | null> => User.findById(id.toString());

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> =>
  User.findOne({ email });

