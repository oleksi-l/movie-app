import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import queryString from "query-string";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  getMovies = (filters, page) => {
    const { sort_by, year, genres } = filters;
    const query = {
      api_key: API_KEY_3,
      primary_release_year: year,
      language: "ru-RU",
      sort_by: sort_by,
      page: page
    };
    if (genres.length > 0) query.with_genres = genres.join(",");

    const link = `${API_URL}/discover/movie?${queryString.stringify(query)}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.updateTotalPages(data.total_pages);
      });
  };

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.updatePage(1);
      this.getMovies(this.props.filters, 1);
    }
    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
