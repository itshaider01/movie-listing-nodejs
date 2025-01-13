import { Request, Response } from 'express';
import { catchAsync, pick } from '../../utils';
import movieService from './movie.service';
import { ApiError } from '../../config/errors';
import httpStatus from 'http-status';
import config from '../../config/config';
import { s3 } from '../../services/aws.service';
import { IOptions } from 'src/utils/paginate/paginate';

/**
 * Create a new movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const createMovie = catchAsync(async (req: Request, res: Response) => {
  const { title, year } = req.body;
  if (!req.file) {
    res.status(400).json({ message: 'Poster image is required' });
    return;
  }
  const movie = await movieService.createNewMovie(title, year, req?.file);
  res.status(201).json(movie);
});
/**
 * Get a specific movie by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getMovie = catchAsync(async (req: Request, res: Response) => {
  const { id } = req?.params || '';

  const movie = await movieService.getSingleMovie(id);

  res.status(200).json(movie);
});

/**
 * Update a movie by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateMovie = catchAsync(async (req: Request, res: Response) => {
  const { title, year } = req.body;
  const { id } = req?.params;

  if (req.file === undefined && title === undefined && year === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nothing was updated');
  }

  const movie = await movieService.updateMovie(id, title, year, req?.file);

  res.status(200).json(movie);
});

export const getMovies = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['title', 'year']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await movieService.queryMovies(filter, options);
  res.send(result);
});

/**
 * Delete a movie by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteMovie = catchAsync(async (req: Request, res: Response) => {
  const { id } = req?.params;

  if (!id) throw new ApiError(httpStatus.NOT_FOUND, 'please provide movie id');

  const movie = await movieService.deleteMovie(id);

  if (movie !== null && movie.poster) {
    const posterKey = movie.poster.split('/').pop() || '';

    const params = {
      Bucket: config.aws.aws_bucket,
      Key: posterKey,
    };

    await s3.deleteObject(params).promise();
  }

  res.status(200).json({ message: 'Movie deleted successfully' });
});
