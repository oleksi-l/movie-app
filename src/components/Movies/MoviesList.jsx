import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies, favoriteMovies, watchList }) => {
  return (
    <div className="row">
      {movies.map(movie => {
        const isFavorite = favoriteMovies.includes(movie.id);
        const inWatchList = watchList.includes(movie.id);
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} isFavorite={isFavorite} inWatchList={inWatchList} />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
  favoriteMovies: [],
  watchList: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  watchList: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
