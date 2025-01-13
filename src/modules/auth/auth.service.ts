import httpStatus from 'http-status';
import { getUserByEmail,  } from '../user/user.service';
import {  IUserDoc, } from '../user/user.interfaces';
import { ApiError } from '../../config/errors';


/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUserDoc> => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};


