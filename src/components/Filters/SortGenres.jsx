import React from "react";
import GenresHOC from "./GenresHOC";
import PropTypes from "prop-types";

const SortGenres = React.memo(({ genres, changeGenre, chosenGenres }) => {
  return (
    <div className="form-group genres__list">
      {genres.map(genre => {
        return (
          <div className="form-check" key={genre.id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={genre.id}
              id={`genre${genre.id}`}
              checked={chosenGenres.includes(genre.id)}
              onChange={changeGenre}
            />
            <label className="form-check-label" htmlFor={`genre${genre.id}`}>
              {genre.name}
            </label>
          </div>
        );
      })}
    </div>
  );
});

SortGenres.defaultProps = {
  genres: []
};

SortGenres.propTypes = {
  genres: PropTypes.array.isRequired
};

export default GenresHOC(SortGenres);
