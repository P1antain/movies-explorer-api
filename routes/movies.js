const express = require('express');

const moviesRoute = express.Router();
const { deleteMovie, createMovie, returnMovies } = require('../controllers/movies');
const { movieIdValidation, movieDataValidation } = require('../middlewares/validation');

moviesRoute.get('/', returnMovies);

moviesRoute.delete('/:movieId', movieIdValidation, deleteMovie);
moviesRoute.post('/', movieDataValidation, createMovie);

module.exports = moviesRoute;
