import React from "react";
import MovieFavoriteIcon from "./MovieFavoriteIcon";
import MovieBookmarkIcon from "./MovieBookmarkIcon";

const MovieActionTab = (props) => {
  const { movieId } = props;
  return (
    <div className="pt-2">
      <MovieFavoriteIcon
        movieId={movieId}
      />
      <MovieBookmarkIcon
        movieId={movieId}
      />
    </div>
  )
}

export default MovieActionTab;