import mongoose, { Document, Model } from 'mongoose';
import { IOptions, QueryResult } from '../../utils/paginate/paginate';

// Movie document interface
export interface IMovie {
  title: string;
  year: string;
  poster?: string;
}

export interface IMovieDoc extends IMovie, Document {
  isTitleTaken(title: string, excludeMovieId?: mongoose.Types.ObjectId): Promise<boolean>;
}

export interface IMovieModel extends Model<IMovieDoc> {
  isTitleTaken(title: string, excludeMovieId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, string | number | boolean>, options: IOptions): Promise<QueryResult>;
}
