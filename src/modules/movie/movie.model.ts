import mongoose from 'mongoose';
import { IMovieDoc, IMovieModel } from './movie.interfaces';
import toJSON from '../../utils/toJSON/toJSON';
import paginate from '../../utils/paginate/paginate';

// Movie Schema definition
const movieSchema = new mongoose.Schema<IMovieDoc, IMovieModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 255,
    },
    year: {
      type: String,
      required: true,
      min: 1888,
      max: new Date().getFullYear(),
    },
    poster: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

/**
 * Static method to check if a movie title is already taken
 * @param {string} title - The movie title
 * @param {ObjectId} [excludeMovieId] - The ID of the movie to be excluded from the check
 * @returns {Promise<boolean>}
 */
movieSchema.statics['isTitleTaken'] = async function (
  title: string,
  excludeMovieId?: mongoose.Types.ObjectId,
): Promise<boolean> {
  const query: any = { title };
  if (excludeMovieId) {
    query._id = { $ne: excludeMovieId }; // Exclude the movie with the specified ID
  }

  const movie = await this.findOne(query); // 'this' refers to the model in this context
  return !!movie;
};

// Define the Movie model
const Movie = mongoose.model<IMovieDoc, IMovieModel>('Movie', movieSchema);

export default Movie;
