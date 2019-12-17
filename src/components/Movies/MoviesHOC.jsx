import React from "react";
import MoviesList from "./MoviesList";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movies: [],
      };
    }

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    getMovies = (filters, page) => {
      const { sort_by, year, genres } = filters;
      const query = {
        primary_release_year: year,
        language: "ru-RU",
        sort_by: sort_by,
        page: page
      };

      if (genres.length > 0) {
        query.with_genres = genres.join(",");
      }

      CallApi.get("/discover/movie", {
        params: query
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
        <Component
          movies={movies}
        />
      );
    }
  };
