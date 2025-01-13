import Joi from 'joi';
import { password } from '../validate/custom.validation';
import { IUser } from '../user/user.interfaces';

const registerBody: Record<keyof IUser, Joi.Schema> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fcmToken: Joi.string().optional(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

export const otpVerify = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    otp: Joi.string().required(),
  }),
};

export const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
