import Joi from 'joi';
import { IMovie } from './movie.interfaces';

const createMovieBody: Record<keyof IMovie, Joi.Schema> = {
  title: Joi.string().required(),
  year: Joi.string().required(),
  poster: Joi.string().allow(''),
};

const createMovieSchema = {
  body: Joi.object().keys(createMovieBody),
};

export default { createMovieSchema };
