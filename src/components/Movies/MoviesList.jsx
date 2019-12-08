import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = (props) => {
  const {movies, favoriteMovies, watchList} = props;
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} favoriteMovies={favoriteMovies} watchList={watchList} />
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
