import React from "react";
import CallApi from "../../api/api";
import LoginForm from "../Header/Login/LoginForm";
import { cookies } from "../App";
import AppContextHOC from "../HOC/AppContextHOC";
import { Star, StarBorder, Bookmark, BookmarkBorder } from "@material-ui/icons";

class MovieActionTab extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      inWatchList: false
    };
  }

  getFavoriteMovies = id => {
    const session_id = cookies.get("session_id");
    const user_id = cookies.get("user_id");
    if (session_id && user_id) {
      const query = {
        language: "ru-RU",
        session_id: session_id,
        account_id: user_id
      };
      CallApi.get(`/account/${user_id}/favorite/movies`, {
        params: query
      }).then(data => {
        const fMovies = data.results.map(item => item.id);
        const isFavorite = fMovies.includes(id) ? true : false;
        this.setState({
          isFavorite: isFavorite
        });
      });
    }
  }; 

  componentWillReceiveProps() {
    this.setState({
      isFavorite: this.props.isFavorite,
      inWatchList: this.props.inWatchList
    });
  }

  toggleLike = item => {
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
        media_id: item.id,
        page: this.props.page,
        favorite: !this.state.isFavorite
      }
    })
    .then(data => {
      this.setState({
        isFavorite: !this.state.isFavorite
      });
    });
  };

  toggleAddWatchlist = item => {
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
        media_id: item.id,
        watchlist: !this.state.inWatchList
      }
    })
    .then(data => {
      this.setState({
        inWatchList: !this.state.inWatchList
      });
    });
  };

  render() {
    return (
      <div className="col pt-2">
        <span
          title={this.state.isFavorite ? "liked" : "unliked"}
          onClick={() => this.toggleLike(this.props.item)}
        >
          {this.state.isFavorite == false ? <StarBorder /> : <Star />}
        </span>
        <span
          title={this.state.inWatchList ? "added" : "not added"}
          onClick={() => this.toggleAddWatchlist(this.props.item)}
        >
          {this.state.inWatchList == false ? <BookmarkBorder /> : <Bookmark />}
        </span>
      </div>
    );
  }
}

export default AppContextHOC(MovieActionTab);
