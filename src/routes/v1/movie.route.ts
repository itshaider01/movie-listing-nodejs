import { auth } from '../../modules/auth';
import { createMovie, deleteMovie, getMovie, getMovies, updateMovie } from '../../modules/movie/movie.controller';
import movieValidation from '../../modules/movie/movie.validation';
import { validate } from '../../modules/validate';
import express, { Router } from 'express';
import upload from '../../services/aws.service';

const router: Router = express.Router();

router.post('/', auth(), upload.single('poster'), validate(movieValidation.createMovieSchema), createMovie);
router.get('/', auth(), getMovies);
router.get('/:id', auth(), getMovie);
router.patch('/:id', auth(), upload.single('poster'), updateMovie);
router.delete('/:id', auth(), deleteMovie);

export default router;
