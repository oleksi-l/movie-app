import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import MovieActionTab from "../../Movies/MovieActionTab";
import Tabs from "./Tabs/Tabs";
import CallApi from "../../../api/api";
import { cookies } from "../../App";

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: {},
      videos: [],
      isFavorite: false,
      inWatchList: false,
      actors: []
    };
  }

  getMovieDetails = () => {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" }
    }).then(data => {
      this.setState({
        movieDetails: data,
      });
      this.getVideo(data.id);
      this.getCredits(data.id);
    });
  };

  getFavoriteMovies = () => {
    const user_id = cookies.get("user_id");
    const session_id = cookies.get("session_id");
    if (user_id && session_id) {
      CallApi.get(`/account/${user_id}/favorite/movies`, {
        params: {
          language: "ru-Ru",
          session_id: session_id
        }
      }).then(data => {
        const fMovies = data.results.map(item => item.id);
        const isFavorite = fMovies.includes(+this.props.match.params.id);
        this.setState({
          isFavorite: isFavorite
        });
      });
    }
  };

  getWatchList = () => {
    const user_id = cookies.get("user_id");
    const session_id = cookies.get("session_id");
    if (user_id && session_id) {
      CallApi.get(`/account/${session_id}/watchlist/movies`, {
        params: {
          language: "ru-Ru",
          session_id: session_id
        }
      }).then(data => {
        const watchList = data.results.map(movie => movie.id);
        const inWatchList = watchList.includes(+this.props.match.params.id);
        this.setState({ inWatchList: inWatchList });
      });
    }
  };

  toggleLike = id => {
    const session_id = cookies.get("session_id");
    const user_id = cookies.get("user_id");
    if (session_id == null) {
      this.props.toggleModal();
      return false;
    }
    CallApi.post("/account/${user_id}/favorite", {
      params: {
        session_id: session_id,
        account_id: user_id
      },
      body: {
        media_type: "movie",
        media_id: id,
        favorite: !this.state.isFavorite
      }
    }).then(data => {
      this.setState({
        isFavorite: !this.state.isFavorite
      });
    });
  };

  toggleAddWatchlist = id => {
    const session_id = cookies.get("session_id");
    const user_id = cookies.get("user_id");
    if (session_id == null) {
      this.props.toggleModal();
      return false;
    }
    CallApi.post("/account/${user_id}/watchlist", {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: id,
        watchlist: !this.state.inWatchList
      }
    }).then(data => {
      this.setState({
        inWatchList: !this.state.inWatchList
      });
    });
  };

  getVideo = (id) => {
    CallApi.get(`/movie/${id}/videos`, { language: "ru-RU" })
      .then(data => this.setState({ videos: data.results }));
  }

  getCredits = (id) => {
    CallApi.get(`/movie/${id}/credits`, {})
      .then(data => this.setState({ actors: data.cast }));
  }

  componentDidMount() {
    this.getWatchList();
    this.getMovieDetails();
    this.getFavoriteMovies();
  }

  render() {
    const { backdrop_path, poster_path, title, overview, id, genres } = this.state.movieDetails;
    const { movieDetails, videos, isFavorite, inWatchList, actors } = this.state;
    return (<div className="container">
      <div className="row mt-3">
        <div className="col-md-4">
          <img className="poster__image"
            src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`} alt="" />
        </div>
        <div className="col-md-8">
          <h3>{title}</h3>
          <MovieActionTab
            id={id} toggleLike={this.toggleLike}
            toggleAddWatchlist={this.toggleAddWatchlist}
            isFavorite={isFavorite}
            inWatchList={inWatchList}
          />
          <h5 className="mt-2">Обзор</h5>
          <p>{overview}</p>
        </div>
        <div className="col-md-12 d-flex pt-3">
          <Tabs id={id} details={movieDetails} videos={videos} actors={actors} />
        </div>
      </div>
    </div>);
  }
}

export default AppContextHOC(MoviePage);