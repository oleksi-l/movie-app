import React from "react";
import { API_GENRES } from "../../api/api";

class SortGenres extends React.Component {
  static defaultProps = {
    checkboxes: API_GENRES
  };

  changeGenre = event => {
    let { genres, onChangeFilters } = this.props;
    if (genres.includes(event.target.value)) {
      genres = genres.filter(item => item != event.target.value);
    } else {
      genres.push(event.target.value);
    }
    onChangeFilters({ target: { name: "genres", value: genres } });
  };

  render() {
    const { checkboxes } = this.props;
    return (
      <React.Fragment>
        <label>Сортировать по жанрам:</label>
        <div className="form-group genres__list">
          {checkboxes.genres.map(genre => {
            return (
              <div className="form-check" key={genre.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={genre.id}
                  id={genre.id}
                  onChange={this.changeGenre}
                />
                <label className="form-check-label" htmlFor={genre.id}>
                  {genre.name}
                </label>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default SortGenres;
