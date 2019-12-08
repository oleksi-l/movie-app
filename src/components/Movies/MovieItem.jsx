import React from "react";
import MovieActionTab from "./MovieActionTab";
import { Link } from "react-router-dom";
import CallApi from "../../api/api";
import { cookies } from "../App";

export default class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      inWatchList: false
    }
  }

  componentWillReceiveProps() {
    const { item, favoriteMovies, watchList } = this.props;
    const isFavorite = favoriteMovies.includes(item.id);
    const inWatchList = watchList.includes(item.id);
    this.setState({
      isFavorite: isFavorite,
      inWatchList: inWatchList
    })
  }

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
        page: this.props.page,
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

  render() {
    const { item } = this.props;
    const { isFavorite, inWatchList } = this.state;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
          alt=""
        />
        <div className="col">
          <MovieActionTab id={item.id} toggleLike={this.toggleLike}
            toggleAddWatchlist={this.toggleAddWatchlist}
            isFavorite={isFavorite} inWatchList={inWatchList} />
        </div>
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}`}>{item.title}</Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
