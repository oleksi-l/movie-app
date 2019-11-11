import React from "react";
import { API_KEY_3, API_URL } from "../../api/api";

class SortGenres extends React.Component {
  constructor() {
    super();
    this.state = {
      genresList: []
    };
  }

  componentDidMount() {
    const queryString = require("query-string");
    const query = queryString.stringify({
      api_key: API_KEY_3,
      language: "ru-RU"
    });
    const url = `${API_URL}/genre/movie/list?${query}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(prevState => ({
          ...prevState.genresList,
          genresList: data.genres
        }));
      });
  }

  changeGenre = event => {
    const { genres, onChangeFilters } = this.props;
    onChangeFilters({
      target: {
        name: "genres",
        value: event.target.checked
          ? [...genres, +event.target.value]
          : genres.filter(item => item !== +event.target.value)
      }
    });
  };

  render() {
    const { genres } = this.props;
    return (
      <React.Fragment>
        <label>Сортировать по жанрам:</label>
        <div className="form-group genres__list">
          {this.state.genresList.map(genre => {
            return (
              <div className="form-check" key={genre.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={genre.id}
                  id={`genre${genre.id}`}
                  checked={genres.includes(genre.id)}
                  onChange={this.changeGenre}
                />
                <label className="form-check-label" htmlFor={`genre${genre.id}`}>
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
