import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import { IUserDoc } from '../user/user.interfaces';
import { ApiError } from '../../config/errors';
const verifyCallback =
  (req: Request, resolve: () => void, reject: (err: ApiError) => void, ) =>
  async (err: Error, user: IUserDoc, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    resolve();
  };
const authMiddleware =
  () =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, ))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
export default authMiddleware;