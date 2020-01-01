import React from "react";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class MovieFavoriteIcon extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    }
  }

  setLoading = state => {
    this.setState({ isLoading: state })
  }

  isFavorite = () => {
    const { favoriteMovies, movieId } = this.props;
    return favoriteMovies.includes(movieId);
  }

  toggleLike = (movieId) => {
    const { session_id, user, favoriteMovies, getFavoriteMovies, toggleModal
    } = this.props;

    if (!session_id) {
      toggleModal();
      return false;
    }

    this.setLoading(true);

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id,
        account_id: user.id
      },
      body: {
        media_type: "movie",
        media_id: movieId,
        favorite: !this.isFavorite()
      }
    })
      .then(data => {
        getFavoriteMovies({ user, session_id });
        this.setLoading(false);
      });
  };

  render() {
    return (
      <span
        disabled={this.state.isLoading}
        onClick={() => this.toggleLike(this.props.movieId)}>
        {!this.isFavorite() ? <FavoriteBorder /> : <Favorite />}
      </span>
    )
  }
}

export default AppContextHOC(MovieFavoriteIcon);