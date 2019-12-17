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
  toggleLike = (movieId) => {
    const { session_id, user, favoriteMovies, getFavoriteMovies,toggleModal
    } = this.props;
    if (session_id === null) {
      toggleModal();
      return false;
    }

    const isFavorite = favoriteMovies.includes(movieId);
    this.setState({ isLoading: true })

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id,
        account_id: user.id
      },
      body: {
        media_type: "movie",
        media_id: movieId,
        favorite: !isFavorite
      }
    })
      .then(data => {
        getFavoriteMovies(user.id, session_id);
        this.setState({ isLoading: false })
      });
  };
  render() {
    const { movieId, favoriteMovies } = this.props;
    const isFavorite = favoriteMovies.includes(movieId);
    
    return (
      <span 
        disabled={this.state.isLoading ? "disabled" : ""}
        onClick={() => this.toggleLike(movieId)}>
        {!isFavorite ? <FavoriteBorder /> : <Favorite />}
      </span>
    )
  }
}

export default AppContextHOC(MovieFavoriteIcon);