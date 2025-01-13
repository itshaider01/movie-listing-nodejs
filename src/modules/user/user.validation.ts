import Joi from 'joi';
import { password, objectId } from '../validate/custom.validation';
import { IUser } from './user.interfaces';

const createUserBody: Record<keyof IUser, Joi.Schema> = {
  email: Joi.string().email().allow(''),
  password: Joi.string().custom(password).allow(''),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};


export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};