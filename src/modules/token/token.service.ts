import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import config from '../../config/config';
import { AccessTokens, } from './token.interfaces';
import { IUserDoc } from '../user/user.interfaces';
import { tokenTypes } from './token.types';

/**
 * Generate token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (id: string, expires: Moment, type: string, secret: string = config.jwt.secret): string => {
  const payload = {
    sub: id,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};


/**
 * Generate auth tokens
 * @param {IUserDoc} user
 * @returns {Promise<AccessTokens>}
 */
export const generateAuthTokens = async (user: IUserDoc): Promise<AccessTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};
