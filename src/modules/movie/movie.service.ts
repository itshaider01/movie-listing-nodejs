import { IOptions, QueryResult } from '../../utils/paginate/paginate';
import { ApiError } from '../../config/errors';
import Movie from './movie.model';
import httpStatus from 'http-status';

export const createNewMovie = async (title: string, year: string, poster: any) => {
  const movieNameToken = await Movie.isTitleTaken(title);

  if (movieNameToken) throw new ApiError(httpStatus.CONFLICT, 'Movie with this title already exist');

  const movie = new Movie({
    title,
    year,
    poster: poster.location,
  });

  await movie.save();

  return movie;
};

export const getSingleMovie = async (id: string | undefined) => {
  const isFound = await Movie.findOne({ _id: id });

  if (isFound === null) throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');

  return isFound;
};

export const updateMovie = async (id: string | undefined, title: string, year: string, poster: any) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }

  if (movie.title !== title) {
    const isTaken = await Movie.isTitleTaken(title);
    if (isTaken) throw new ApiError(httpStatus.CONFLICT, 'Movie with this title already exist');
  }

  movie.title = title || movie.title;
  movie.year = year || movie.year;
  movie.poster = poster !== undefined ? poster?.location : movie.poster;

  const _movie = await movie.save();

  return _movie;
};

export const deleteMovie = async (id: string) => {
  const movie = await Movie.findByIdAndDelete(id);

  if (movie === null) throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  return movie;
};

/**
 * Query for Movies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMovies = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const movies = await Movie.paginate(filter, options);
  return movies;
};

export default { updateMovie, createNewMovie, getSingleMovie, deleteMovie, queryMovies };
