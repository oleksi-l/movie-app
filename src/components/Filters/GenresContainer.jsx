import React from "react";
import SortGenres from "./SortGenres";
import { API_KEY_3, API_URL } from "../../api/api";
import queryString from "query-string";

export default class GenresContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      genresList: []
    };
  }

  componentDidMount() {
    const query = queryString.stringify({
      api_key: API_KEY_3,
      language: "ru-RU"
    });
    const url = `${API_URL}/genre/movie/list?${query}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          genresList: data.genres
        });
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
    return (
      <React.Fragment>
        <label>Сортировать по жанрам:</label>
        <SortGenres
          genres={this.state.genresList}
          changeGenre={this.changeGenre}
          chosenGenres={this.props.genres}
        />
      </React.Fragment>
    );
  }
}
