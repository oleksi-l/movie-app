import React from "react";
import SortGenres from "./SortGenres";
import CallApi from "../../api/api";

export default class GenresContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      genresList: []
    };
  }

  componentDidMount() {
    const query = {
      language: "ru-RU"
    };
    CallApi.get("/genre/movie/list", {
      params: query
    }).then(data => {
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
