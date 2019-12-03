import React from "react";
import MoviesList from "./MoviesList";
import CallApi from "../../api/api";
import { cookies } from "../App";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movies: [],
        favoriteMovies: [],
        watchList: []
      };
    }

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
      this.getFavoriteMovies(this.props.filters, this.props.page);
      this.getWatchList(this.props.filters, this.props.page);
    }

    getMovies = (filters, page) => {
      const { sort_by, year, genres } = filters;
      const query = {
        primary_release_year: year,
        language: "ru-RU",
        sort_by: sort_by,
        page: page
      };

      if (genres.length > 0) query.with_genres = genres.join(",");

      CallApi.get("/discover/movie", {
        params: query
      }).then(data => {
        this.setState({
          movies: data.results
        });
        this.props.updateTotalPages(data.total_pages);
      });
    };

    getFavoriteMovies = (filters, page) => {
      const user_id = cookies.get("user_id");
      const session_id = cookies.get("session_id");

      if (user_id && session_id) {
        CallApi.get(`/account/${user_id}/favorite/movies`, {
          params: {
            sort_by: filters.sort_by,
            language: "ru-Ru",
            page: page,
            session_id: session_id
          }
        }).then(data => {
          const fMovies = data.results.map(movie => movie.id);
          this.setState({ favoriteMovies: fMovies });
        });
      }
    };

    getWatchList = (filters, page) => {
      const user_id = cookies.get("user_id");
      const session_id = cookies.get("session_id");

      if (user_id && session_id) {
        CallApi.get(`/account/${session_id}/watchlist/movies`, {
          params: {
            sort_by: filters.sort_by,
            language: "ru-Ru",
            page: page,
            session_id: session_id
          }
        }).then(data => {
          const watchList = data.results.map(movie => movie.id);
          this.setState({ watchList: watchList });
        });
      }
    };

    componentDidUpdate(prevProps) {
      if (this.props.filters !== prevProps.filters) {
        this.props.updatePage(1);
        this.getMovies(this.props.filters, 1);
        this.getFavoriteMovies(this.props.filters, 1);
        this.getWatchList(this.props.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
        this.getFavoriteMovies(this.props.filters, this.props.page);
        this.getWatchList(this.props.filters, this.props.page);
      }
    }

    render() {
      const { movies, favoriteMovies, watchList } = this.state;
      return (
        <Component
          movies={movies}
          favoriteMovies={favoriteMovies}
          watchList={watchList}
          {...this.props}
        />
      );
    }
  };
