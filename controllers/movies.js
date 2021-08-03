const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const returnMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError('No saved movies found');
    })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((newMovie) => res
      .send(newMovie))
    .catch(() => {
      throw new BadRequestError('Failed to add a movie');
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const requestedMovieId = req.params.id;
  const userId = req.user._id;
  Movie.findById(requestedMovieId)
    .then((requestedMovie) => {
      if (requestedMovie.owner.toString() === userId) {
        requestedMovie.remove()
          .then(() => res.send({ message: 'Error, you cannot delete someone else movie' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Error, you cannot delete someone else movie');
      }
    })
    .catch(() => { throw new NotFoundError('Cant find the movie you want'); })
    .catch(next);
};

module.exports = {
  returnMovies, createMovie, deleteMovie,
};
